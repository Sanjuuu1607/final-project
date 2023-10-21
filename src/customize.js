import React, { useState } from "react";
import Avataaar from "./avatar";

function Customize ()  {
  const [Attributes, setAttributes] = useState({
    topType: "ShortHairDreads02",
    accessoriesType: "Prescription02",
    hairColor: "BrownDark",
    facialHairType: "Blank",
    clotheType: "Hoodie",
    clotheColor: "PastelBlue",
    eyeType: "Happy",
    eyebrowType: "Default",
    mouthType: "Smile",
    avatarStyle: "Transparent",
    skinColor: "Light",
  });

  return (
    <div>
      <Avataaar value={Attributes} onChange={setAttributes} />
    </div>
  );
};

export default Customize;
