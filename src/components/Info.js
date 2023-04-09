import React from "react";

const links = [
  {
    "text": "Godot Tutorial",
    "link": "https://gamefromscratch.com/mixamo-character-animation-combiner/"
  },
  {
    "text": "Interactive Characters with three.js",
    "link": "https://tympanus.net/codrops/2019/10/14/how-to-create-an-interactive-3d-character-with-three-js/",
  },
  {
    "text": "Convert FBX to GLTF",
    "link": "https://github.com/facebookincubator/FBX2glTF"
  }
]

const Info = () => {
  return (
    <div className="card center-align grey darken-3 white-text">
      <h5>Useful Links</h5>
      <hr />
      {
        links.map(link =>
          <span key={link.text}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={link.link}
            >
              {link.text}
            </a>
            <br/>
          </span>
        )
      }
    </div>
  );
};

export default Info;
