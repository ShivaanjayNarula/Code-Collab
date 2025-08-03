import JoinCollab from "./JoinCollab";

function page({ params }: { params: { collabId: string } }) {
  return <JoinCollab collabId={params.collabId} />;
}

export default page;
