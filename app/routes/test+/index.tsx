import { Link } from "@remix-run/react";
import { TestTubeDiagonal } from "lucide-react";

const Component = () => {
  return <div className="m-4">
    <ul className="flex flex-col gap-2">
    <li>
        <Link className="flex items-center gap-2" to="/test/ok"><TestTubeDiagonal size={16} />正常页面</Link>
      </li>
      <li>
        <Link className="flex items-center gap-2" to="/test/error/not-found"><TestTubeDiagonal size={16} />不存在的页面</Link>
      </li>
      <li>
        <Link className="flex items-center gap-2" to="/test/error/not-found-data"><TestTubeDiagonal size={16} />不存在的数据</Link>
      </li>
      <li>
        <Link className="flex items-center gap-2" to="/test/error/server-error"><TestTubeDiagonal size={16} />服务端错误</Link>
      </li>
    </ul>
  </div>;
};

export default Component;