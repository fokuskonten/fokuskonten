import DmcaPage, { metadata as dmcaMeta } from '../dmca/page';

export const metadata = {
  ...dmcaMeta,
  alternates: { canonical: 'https://fokuskonten.my.id/dmca-policy' },
};

export default function Page() {
  return <DmcaPage />;
}
