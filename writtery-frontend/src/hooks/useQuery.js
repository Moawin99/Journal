import React from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

function useQuery(){
	const {search} = useLocation();
	return React.useMemo(() => 
		new URLSearchParams(search), [search]);
}

export default useQuery;