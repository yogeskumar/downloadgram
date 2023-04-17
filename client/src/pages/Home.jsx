import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
// import { saveAs } from "file-saver";

const Home = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const [inputValue, setInputValue] = useState("");
  const [links, setLinks] = useState([]);
  const [mediaType, setMediaType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const checkMediaFormat = (link) => {
    const imageFormats = [
      "JPEG",
      "JPG",
      "PNG",
      "GIF",
      "BMP",
      "TIFF",
      "RAW",
      "SVG",
      "WEBP",
      "HEIF",
      "HEIC",
      "AVIF",
    ];

    const videoFormats = [
      "AVI",
      "WMV",
      "FLV",
      "MOV",
      "MKV",
      "3GP",
      "MPG",
      "WebM",
      "ASF",
      "VOB",
      "OGG",
      "M4V",
      "MPEG-2",
      "MPEG-4",
    ];
    const lowerCaseLink = link.toLowerCase();
    // console.log("Link-" + link);
    const isImage = imageFormats.some((format) => {
      return lowerCaseLink.includes(format.toLowerCase());
    });
    if (isImage) {
      // console.log("Image format detected");
      return "image";
    }

    const isVideo = videoFormats.some((format) => {
      return lowerCaseLink.includes(format.toLowerCase());
    });
    if (isVideo) {
      // console.log("Video format detected");
      return "video";
    }

    // console.log("Media format not detected");
    return null;
  };

  useEffect(() => {
    if (inputValue.includes("https://www.instagram.com/p")) {
      setMediaType("post");
    }
    if (inputValue.includes("https://www.instagram.com/reel")) {
      setMediaType("reel");
    }
    if (inputValue.includes("https://www.instagram.com/stories")) {
      setMediaType("story");
    }
  }, [inputValue]);

  const handleInputChange = (event) => {
    setLinks([]);
    setInputValue(event.target.value);
  };

  const handleButtonClick = async () => {
    setIsLoading(true);
    if (
      !inputValue.includes("https://www.instagram.com/") &&
      inputValue.length < 33
    ) {
      window.alert("Please enter a valid url");
      setIsLoading(false);
      return;
    }
    try {
      const response = await axios.post(
        "https://downloadgram-backend.onrender.com/",
        {
          inputValue,
        }
      );
      console.log("media ->", response.data.links);
      setLinks(response.data.links);
    } catch (error) {
      console.error(error);
      window.alert("Please enter valid URL");
    }
    setIsLoading(false);
  };

  // const downloadFile = (link, name) => {
  //   saveAs(link, name); // Put your image url here.
  // };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <OutlinedInput
        sx={{
          borderRadius: "20px",
          padding: "10px 20px",
          width: isDesktop ? "500px" : "80%",
          height: "50px",
          margin: "auto",
          marginBottom: "16px",
          marginTop: "10px",
          "&:hover:not($disabled):not($error) $notchedOutline": {
            borderColor: theme.palette.primary.main,
            borderWidth: "2px",
          },
          "&:focus:not($disabled):not($error) $notchedOutline": {
            borderColor: theme.palette.primary.main,
            borderWidth: "2px",
          },
          "&.Mui-focused $notchedOutline": {
            borderColor: theme.palette.primary.main,
            borderWidth: "2px",
          },
        }}
        value={inputValue}
        type="string"
        placeholder="enter instagram url..."
        onChange={handleInputChange}
        inputProps={{ "aria-label": "instagram url" }}
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          onClick={handleButtonClick}
          sx={{ height: "60px", fontSize: "20px" }}
        >
          Download Now
        </Button>
      </div>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "30px auto",
          }}
        >
          <CircularProgress color="secondary" size={40} />
        </div>
      ) : (
        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{ marginTop: isDesktop ? "3%" : "2%" }}
        >
          {links.map((item, index) => {
            // console.log(item);
            // if (!item.includes("https://media.instasupersave.com")) {
            if (mediaType === "post" && links.length > 1) {
              return (
                <Grid key={index} item xs={6} sm={4} md={3} lg={2}>
                  <div
                    style={{
                      // width: "100%",
                      height: "400px",
                      backgroundColor: "red",
                      padding: "10px",
                      // minWidth: "300px",
                      maxWidth: "360px",
                      margin: "auto",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={item}
                      alt="someImage"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "90%",
                        objectFit: "contain",
                        margin: "auto",
                        display: "block",
                      }}
                    />

                    <Button
                      variant="contained"
                      // onClick={(event) => {
                      //   event.preventDefault();
                      //   window.open(item, "_blank");
                      // }}
                      onClick={(event) => {
                        event.preventDefault();
                        window.open(item, "_blank");
                        // downloadFile(item, index);
                      }}
                      sx={{
                        height: "50px",
                        fontSize: "20px",
                        width: "100%",
                        minWidth: "30px",
                      }}
                    >
                      Download Now
                    </Button>
                  </div>
                </Grid>
              );
            }
            if (mediaType === "reel") {
              return (
                <Grid key={index} item xs={6} sm={4} md={3} lg={2}>
                  <div
                    style={{
                      width: "100%",
                      height: "300px",
                      backgroundColor: "red",
                      padding: "10px",
                      maxWidth: "360px",
                      margin: "auto",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <video
                      controls
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    >
                      <source src={item} type="video/mp4" />
                    </video>
                  </div>
                </Grid>
              );
            }
            return (
              <Grid key={index} item xs={6} sm={4} md={3} lg={2}>
                <div
                  key={index}
                  style={{
                    width: "100%",
                    height: "300px",
                    backgroundColor: "red",
                    padding: "10px",
                    maxWidth: "360px",
                    margin: "auto",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: 30,
                      fontWeight: "bold",
                      textAlign: "center",
                      marginBottom: "30%",
                    }}
                  >
                    Click the button below to download
                  </div>
                  <Button
                    variant="contained"
                    onClick={(event) => {
                      event.preventDefault();
                      window.open(item, "_blank");
                    }}
                    sx={{ height: "50px", fontSize: "20px", width: "100%" }}
                  >
                    Download Now
                  </Button>
                </div>
              </Grid>
            );
          })}
        </Grid>
      )}
    </div>
  );
};

export default Home;
