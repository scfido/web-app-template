import { useParams } from "@remix-run/react";

const Component = () => {
  const { id } = useParams();
  return <div className="m-4">TestId: {id}</div>;
};

export default Component;