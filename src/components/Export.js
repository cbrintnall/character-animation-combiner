import React, { useContext } from "react";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
import { Context as ModalContext } from "../context/ModelContext";

const Export = () => {
  const {
    state: { mainModel, animations },
    toggleLoading,
  } = useContext(ModalContext);

  const save = (blob, filename) => {
    var link = document.createElement("a");
    link.style.display = "none";
    document.body.appendChild(link);
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    toggleLoading();
  };

  const saveString = (text, filename) => {
    save(new Blob([text], { type: "text/plain" }), filename);
  };

  const saveArrayBuffer = (buffer, filename) => {
    save(new Blob([buffer], { type: "application/octet-stream" }), filename);
  };

  const exportModel = cb => () =>{
    toggleLoading();
    try {
      cb();
    } catch (error) {
      toggleLoading();
      alert(
        "Error: Try deleting the texture, if that does not help, Open an issue on the Github Repo"
      );
    }
  }

  const exportGLB = () => {
    // Parse the input and generate the glTF output
    new GLTFExporter().parse(
      mainModel,
      function (result) {
        saveArrayBuffer(result, `cac-${new Date().getTime()}.glb`);
      },
      { trs: true, binary: true, animations: animations }
    );
  };

  const exportGLTF = () => {
    // Parse the input and generate the glTF output
    new GLTFExporter().parse(
      mainModel,
      function (result) {
        var output = JSON.stringify(result, null, 2);
        saveString(output, `cac-${new Date().getTime()}.gltf`);
      },
      { trs: true, binary: false, animations: animations }
    );
  };

  return (
    <div style={{ height: 100 }}>
      <h4 className="white-text">Export</h4>

      <div className="row">
        <button
          style={{ margin: "0 auto" }}
          className="waves-effect waves-light btn-large indigo accent-4 col m12 l6"
          onClick={exportModel(exportGLTF)}
        >
          GLTF
        </button>

        <button
          style={{ margin: "0 auto" }}
          className="waves-effect waves-light btn-large indigo accent-4 col m12 l6"
          onClick={exportModel(exportGLB)}
        >
          GLB
        </button>
      </div>
    </div>
  );
};

export default Export;
