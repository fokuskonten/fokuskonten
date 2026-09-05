import os
import sys
import shutil
import zipfile
import json
import re
import subprocess

# Pastikan tool gdown terpasang
try:
    import gdown
except ImportError:
    print("📦 Menginstal tool gdown...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "-q", "gdown", "tqdm"])
    import gdown

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MANIFEST_FILE = os.path.join(BASE_DIR, "cdr_manifest.json")
OUTPUT_BASE = os.path.join(os.getcwd(), "KATALOG_CDR_EXPORT")
CHECKPOINT_FILE = os.path.join(OUTPUT_BASE, "_checkpoint_cdr.json")

os.makedirs(OUTPUT_BASE, exist_ok=True)

if not os.path.exists(MANIFEST_FILE):
    print(f"❌ File manifest tidak ditemukan di: {MANIFEST_FILE}")
    sys.exit(1)

with open(MANIFEST_FILE, "r", encoding="utf-8") as f:
    catalog = json.load(f)

completed_skus = set()
if os.path.exists(CHECKPOINT_FILE):
    try:
        with open(CHECKPOINT_FILE, "r", encoding="utf-8") as cf:
            completed_skus = set(json.load(cf))
    except Exception:
        pass

print("=" * 65)
print("  🚀 FOKUSKONTEN CLOUD PIPELINE - COREL DRAW / CDR")
print("=" * 65)
print(f"🎯 Total Produk CorelDRAW: {len(catalog)} item")
print(f"✅ Sudah pernah selesai   : {len(completed_skus)} item")

# PENGATURAN: Uji coba HANYA 1 item dulu!
BATCH_LIMIT = 1
MASTER_EXTENSIONS = {".cdr", ".eps", ".ai", ".pdf"}
FONT_EXTENSIONS = {".ttf", ".otf", ".woff", ".woff2"}

processed = 0

for item in catalog:
    if processed >= BATCH_LIMIT:
        print(f"\n⏸️ Selesai memproses ({BATCH_LIMIT} item).")
        break

    sku = item["sku"].strip()
    title = re.sub(r"[/\\?%*:|\"<>]", "-", item.get("title", sku)).strip()
    file_id = item.get("drive_file_id")

    product_folder_name = f"{sku} - {title}"[:100]
    product_dir = os.path.join(OUTPUT_BASE, product_folder_name)
    master_dir = os.path.join(product_dir, "01 - File Master Desain")
    font_dir = os.path.join(product_dir, "02 - Font Pendukung")

    # Jika produk sudah pernah diproses dan ada file masternya, lewati
    if os.path.exists(master_dir) and len(os.listdir(master_dir)) > 0:
        continue

    print(f"\n🚀 [1/{BATCH_LIMIT}] Memproses {sku}: {title}")
    print(f"   ⬇️ Mendownload ZIP dari Google Cloud (ID: {file_id})...")

    temp_zip = f"/tmp/{sku}.zip" if os.name != "nt" else f"C:/Temp/{sku}.zip"
    temp_extract = f"/tmp/extract_{sku}" if os.name != "nt" else f"C:/Temp/extract_{sku}"
    os.makedirs(os.path.dirname(temp_zip), exist_ok=True)

    try:
        # Download menggunakan file_id (kompatibel dengan semua versi gdown)
        gdown.download(id=file_id, output=temp_zip, quiet=False)

        if not os.path.exists(temp_zip) or os.path.getsize(temp_zip) < 1000:
            print(f"   ⚠️ Gagal mengunduh file {sku}. Ukuran tidak valid.")
            continue

        zip_size_mb = os.path.getsize(temp_zip) / (1024 * 1024)
        print(f"   📦 Ukuran ZIP: {zip_size_mb:.2f} MB. Mengekstrak file mentahan...")

        os.makedirs(master_dir, exist_ok=True)
        extracted_masters = 0
        extracted_fonts = 0

        # Cek apakah file yang diunduh adalah file CorelDRAW (.CDR) murni
        # File CDR modern adalah ZIP container dengan mimetype 'application/x-vnd.corel.zcf.draw.document+zip'
        is_direct_cdr = False
        try:
            with zipfile.ZipFile(temp_zip, "r") as z:
                namelist = set(z.namelist())
                if "mimetype" in namelist:
                    mime = z.read("mimetype").decode("utf-8", errors="ignore").strip()
                    if "corel" in mime.lower():
                        is_direct_cdr = True
                elif "content/root.dat" in namelist or "content/data/masterPage.dat" in namelist:
                    is_direct_cdr = True
        except Exception:
            pass

        if is_direct_cdr:
            # File yang diunduh adalah file CorelDRAW mentahan asli!
            target_cdr_name = f"{title}.cdr" if not title.lower().endswith(".cdr") else title
            target_cdr_path = os.path.join(master_dir, target_cdr_name)
            shutil.copy2(temp_zip, target_cdr_path)
            extracted_masters = 1
            f_size_mb = os.path.getsize(target_cdr_path) / (1024 * 1024)
            print(f"      ✨ Terdeteksi File Master CorelDRAW (.CDR) Asli: {target_cdr_name} ({f_size_mb:.2f} MB)")
        else:
            # File adalah arsip ZIP yang berisi file-file di dalamnya
            os.makedirs(temp_extract, exist_ok=True)
            with zipfile.ZipFile(temp_zip, "r") as z:
                z.extractall(temp_extract)

            for root, _, files_in_dir in os.walk(temp_extract):
                for f_name in files_in_dir:
                    f_ext = os.path.splitext(f_name.lower())[1]
                    full_src = os.path.join(root, f_name)

                    if f_ext in FONT_EXTENSIONS:
                        os.makedirs(font_dir, exist_ok=True)
                        shutil.copy2(full_src, os.path.join(font_dir, f_name))
                        extracted_fonts += 1
                    elif f_ext in MASTER_EXTENSIONS:
                        shutil.copy2(full_src, os.path.join(master_dir, f_name))
                        extracted_masters += 1
                        if extracted_masters <= 5 or extracted_masters % 50 == 0:
                            f_size_mb = os.path.getsize(full_src) / (1024 * 1024)
                            print(f"      ✨ Ditemukan Master: {f_name} ({f_size_mb:.2f} MB)")

        print(f"   🎉 Berhasil diekstrak:")
        print(f"      - Master File (.CDR/.EPS): {extracted_masters} file di: 01 - File Master Desain/")
        print(f"      - Font Pendukung          : {extracted_fonts} file di: 02 - Font Pendukung/")

        if extracted_masters > 0:
            completed_skus.add(sku)
            with open(CHECKPOINT_FILE, "w", encoding="utf-8") as cf:
                json.dump(list(completed_skus), cf, indent=2)
            processed += 1

            # Jika rclone sudah terkonfigurasi, langsung unggah ke Google Drive!
            rclone_conf = os.path.expanduser("~/.config/rclone/rclone.conf")
            if os.path.exists(rclone_conf):
                print(f"\n   🚀 Mengunggah {product_folder_name} langsung ke Google Drive admin@fokuskonten.my.id...")
                try:
                    subprocess.check_call([
                        "rclone", "copy", product_dir, f"gdrive:KATALOG FOKUSKONTEN/{product_folder_name}", "-q"
                    ])
                    print("   ✅ 100% SUKSES TERSIMPAN DI GOOGLE DRIVE!")
                except Exception as rerr:
                    print(f"   ⚠️ Catatan rclone: {rerr}")
        else:
            print(f"   ⚠️ Tidak ditemukan file master pada {sku}.")

    except Exception as e:
        print(f"   ❌ Terjadi kesalahan pada {sku}: {str(e)}")
    finally:
        if os.path.exists(temp_zip):
            try: os.remove(temp_zip)
            except Exception: pass
        if os.path.exists(temp_extract):
            try: shutil.rmtree(temp_extract, ignore_errors=True)
            except Exception: pass

print("\n" + "=" * 65)
print(f"✅ Pengujian selesai! {processed} produk berhasil diproses.")
print(f"📁 Folder hasil dapat dilihat di folder: KATALOG_CDR_EXPORT")
print("=" * 65)
