import { useEffect, useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const ScrollTop = () => {
  const [scrolltop, setScrolltop] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        setScrolltop(true);
      } else {
        setScrolltop(false);
      }
    });
  }, []);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div>
      {scrolltop && (
        <button
          style={{
            position: "fixed",
            bottom: "13px",
            right: "77px",
            color:'#fff',
            cursor:'pointer',
            width: '52px',
            height: '52px',
            backgroundColor: '#06a6b7',
            marginBottom: '5px',
            borderRadius: '50%',
            border: '1px solid #fff',
            zIndex: "555",
          }}
          onClick={scrollTop}
        >
          <ExpandLessIcon  sx={{fontSize:'30px'}}/>
        </button>
      )}
    </div>
  );
};

export default ScrollTop;
