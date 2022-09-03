import React, { useEffect } from "react";

export const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        //현재 돔이 모달을 건들고 있거나 모달 안에 있는 요소라면 안꺼짐
        return;
      }
      handler(); // 제 3자라면 handler함수 작동
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchdown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchdown", listener);
    };
  }, [ref, handler]);
};

// export default useOnClickOutside;
//default로 export 하면  import 할때 {} 중괄호 안써도 됨
