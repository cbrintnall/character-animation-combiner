import React, { useContext, useEffect, useState } from "react";
import { Context as ModalContext } from "../context/ModelContext";

const AnimationList = () => {
  const {
    state: { animations, mixer },
    changeName,
    deleteAnimation,
  } = useContext(ModalContext);

  const [playing, setPlaying] = useState(null);
  const [action, setAction] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    if (action) {
      action.play();
    }
  }, [action]);

  const playAnimation = (animation) => {
    if (animation.uuid === playing) return;
    if (action) action.stop();
    setAction(mixer.clipAction(animation));
    setPlaying(animation.uuid);
  };

  const changeAnimationName = (animation) => {
    if (name.length) {
      animation.name = name;
      changeName(animation);
    }
    setEditingId(null);
  };

  const removeAnimation = (animationId) => {
    if (action && action._clip.uuid === animationId) action.stop();
    deleteAnimation(animationId);
  };

  return (
    <ul className="collection with-header">
      <li className="collection-header active grey darken-3 white-text">
        <h5>Animations ({animations.length})</h5>
        <p>Double Click to rename | Click to play</p>
      </li>
      <div style={{ height: "75vh", overflow: "auto" }}>
        {!animations.length && (
          <li
            className="collection-item red darken-2 white-text animation-item row"
            onClick={() => action.stop()}
          >
            <span className="left material-icons">report</span>

            <span className="col">No animations loaded</span>
          </li>
        )}
        {animations.length && (
          <li
            className="collection-item red darken-2 white-text animation-item row"
            onClick={() => {
              action.stop();
              setPlaying(null);
            }}
          >
            <span className="left material-icons">stop</span>

            <span className="col">Stop All Animations</span>
          </li>
        )}
        {animations.length &&
          animations.map((item) =>
            item.uuid === editingId ? (
              <input
                name="rename"
                style={{ paddingLeft: 10, color: "#fff" }}
                key={item.uuid}
                type="text"
                placeholder="Rename"
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" ? changeAnimationName(item) : null
                }
                onBlur={(e) => changeAnimationName(item)}
                // onFocus={() => playAnimation(item)}
                defaultValue={item.name}
                autoFocus
              />
            ) : (
              <li
                key={item.uuid}
                className="collection-item grey darken-2 white-text animation-item row"
                onClick={() => playAnimation(item)}
                onDoubleClick={() => setEditingId(item.uuid)}
                style={{
                  color: item.uuid === playing ? "#576ff6" : "",
                }}
              >
                {item.uuid === playing && (
                  <span className="left material-icons">play_arrow</span>
                )}
                <span className="col">{item.name}</span>
                <span
                  className="col left material-icons right red-text"
                  onClick={() => removeAnimation(item.uuid)}
                >
                  delete
                </span>
              </li>
            )
          )}
      </div>
    </ul>
  );
};

export default AnimationList;
