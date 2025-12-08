import { useCallback } from "react";

const useDownloadCV = () => {
  return useCallback(() => {
    const link = document.createElement("a");
    link.href = "assets/Sebastian Olarte Ramirez_Hoja de vidaCV_2025.pdf"; // relative path from /public
    link.download = "CV_Sebastian Olarte Ramirez_2025.pdf"; // suggested filename
    link.click();
  }, []);
};

export default useDownloadCV;
