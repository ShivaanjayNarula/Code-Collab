import React from "react";
import CreateCollab from "./CreateCollab";

function page({ params }: { params: { name: string } }) {
  return <CreateCollab params={params} />;
}

export default page;
