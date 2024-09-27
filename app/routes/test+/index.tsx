import { Link } from "@remix-run/react";
import { TestTubeDiagonal } from "lucide-react";

const Component = () => {
  return <div className="m-4">
    <ul className="flex flex-col gap-2">
      <li>
        <Link className="flex items-center gap-2" to="/test/1"><TestTubeDiagonal size={16} />测试1</Link>
      </li>
      <li>
        <Link className="flex items-center gap-2" to="/test/2"><TestTubeDiagonal size={16} />测试2</Link>
      </li>
    </ul>
  </div>;
};

export default Component;