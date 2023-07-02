const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");

const metadata = new grpc.Metadata();
metadata.set("authorization", "Key " + "8ee434780de44825a764987fa5900c9b");

const stub = ClarifaiStub.grpc();

/**
  GENERAL_MODEL: 'aaa03c23b3724a16a56b629203edc62c',
  FOOD_MODEL: 'bd367be194cf45149e75f01d59f77ba7',
  TRAVEL_MODEL: 'eee28c313d69466f836ab83287a54ed9',
  NSFW_MODEL: 'e9576d86d2004ed1a38ba0cf39ecb4b1',
  WEDDINGS_MODEL: 'c386b7a870114f4a87477c0824499348',
  WEDDING_MODEL: 'c386b7a870114f4a87477c0824499348',
  COLOR_MODEL: 'eeed0b6733a644cea07cf4c60f87ebb7',
  CLUSTER_MODEL: 'cccbe437d6e54e2bb911c6aa292fb072',
  FACE_DETECT_MODEL: 'a403429f2ddf4b49b307e318f00e528b',
  FOCUS_MODEL: 'c2cf7cecd8a6427da375b9f35fcd2381',
  LOGO_MODEL: 'c443119bf2ed4da98487520d01a0b1e3',
  DEMOGRAPHICS_MODEL: 'c0c0ac362b03416da06ab3fa36fb58e3',
  GENERAL_EMBED_MODEL: 'bbb5f41425b8468d9b7a554ff10f8581',
  FACE_EMBED_MODEL: 'd02b4508df58432fbb84e800597b8959',
  APPAREL_MODEL: 'e0be3b9d6a454f0493ac3a30784001ff',
  MODERATION_MODEL: 'd16f390eb32cad478c7ae150069bd2c6',
  TEXTURES_AND_PATTERNS: 'fbefb47f9fdb410e8ce14f24f54b47ff',
  LANDSCAPE_QUALITY: 'bec14810deb94c40a05f1f0eb3c91403',
  PORTRAIT_QUALITY: 'de9bd05cfdbf4534af151beb2a5d0953',
  CELEBRITY_MODEL: 'e466caa0619f444ab97497640cefc4dc'
 */

const handleApiCall = (req, res) => {
  stub.PostModelOutputs(
    {
      user_app_id: {
        user_id: "dalton-0x0",
        app_id: "face-detection-app-01",
      },
      model_id: "face-detection",
      inputs: [{ data: { image: { url: req.body.input } } }],
    },
    metadata,
    (err, response) => {
      if (err) {
        throw new Error(err);
      }

      if (response.status.code !== 10000) {
        throw new Error(
          "Post model outputs failed, status: " + response.status.description
        );
      }

      // Since we have one input, one output will exist here.
      const output = response.outputs[0];

      console.log("Predicted concepts:");
      for (const concept of output.data.concepts) {
        console.log(concept.name + " " + concept.value);
      }
      console.log(response);
      res.json(response);
    }
  );
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).json("---"));
};

module.exports = {
  handleImage,
  handleApiCall,
};
