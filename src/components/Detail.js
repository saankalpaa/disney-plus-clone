import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import db from "../firebase";
import YouTube from "react-youtube";

const Detail = (props) => {
  const { id } = useParams();
  const [detailData, setDetailData] = useState({});
  const [trailerUrl, setTrailerUrl] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [anotherButtonClicked, setAnotherButtonClicked] = useState(false);

  useEffect(() => {
    db.collection("movies")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setDetailData(doc.data());
        } else {
          console.log("no such document in firebase");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, [id]);

  useEffect (() => {
    db.collection("lists")
    .doc(id)
    .get()
    .then(documentSnapshot => {
      console.log('User exists: ', documentSnapshot.exists);

      if (documentSnapshot.exists) {
        setButtonClicked(true)
        setAnotherButtonClicked(true)
      } 
      console.log(buttonClicked)
    });
  },[id]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
        autoplay: 1
    }
  }

  const popupTrailer = () => {
      if (trailerUrl) {
          setTrailerUrl('');
      }
      else {
        setTrailerUrl(detailData.trailerURL)
      }
  }

  const addToWatchList = () => {
    db.collection("lists")
      .doc(id)
      .set({
        backgroundImg: detailData.backgroundImg,
        cardImg: detailData.cardImg,
        description: detailData.description,
        subTitle: detailData.subTitle,
        title: detailData.title,
        titleImg: detailData.titleImg,
        type: 'watchList'
      })
      .then(() => {
        console.log('successfully added'+ `${detailData.title}` + ' to the watchList')
        setButtonClicked(true)
        setAnotherButtonClicked(true)
      })
      .catch((error) => {
        console.error("",error)
      })
  }

  const removeFromWatchList= () => {
    db.collection('lists')
    .doc(id)
    .delete()
    .then(() => {
      console.log("successfully removed");
      setButtonClicked(false)
      setAnotherButtonClicked(false)
    });
  }

  return (
    <Container>
      <Background>
        <img alt={detailData.title} src={detailData.backgroundImg} />
      </Background>
      <ImageTitle>
        <img alt={detailData.title} src={detailData.titleImg} />
      </ImageTitle>
      <ContentMeta>
        <Controls>
          {/* <Player> 
            <img src="/images/play-icon-black.png" alt="" />
            <span>Play</span>
          </Player> */}
          <Trailer onClick = {popupTrailer}>
            <img src="/images/play-icon-white.png" alt="" />
            <span>Trailer</span>
          </Trailer>
          <AddList onClick={() => {addToWatchList()}} style={buttonClicked?{visibility: 'hidden'}: {visibility: 'visible'}}>
            <span />
            <span />
          </AddList>
          <AddListAfter onClick={() => {removeFromWatchList()}} style={anotherButtonClicked?{visibility: 'visible'}: {visibility: 'hidden'}}>
            <span />
            <span />
          </AddListAfter>
        </Controls>
        <SubTitle>{detailData.subTitle}</SubTitle>
        <Description>{detailData.description}</Description>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
      </ContentMeta>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  min-height: calc(100vh-250px);
  overflow-x: hidden;
  display: block;
  padding: 0 calc(3.5vw + 5px);
`;

const Background = styled.div`
  left: 0px;
  opacity: 0.8;
  position: fixed;
  right: 0px;
  top: 0px;
  z-index: -1;
  img {
    width: 100vw;
    height: 100vh;
    @media (max-width: 768px) {
      width: initial;
    }
  }
`;

const ImageTitle = styled.div`
  align-items: flex-end;
  display: flex;
  -webkit-box-pack: start;
  justify-content: flex-start;
  margin: 0px auto;
  height: 30vw;
  min-height: 170px;
  padding-bottom: 24px;
  width: 100%;
  img {
    max-width: 600px;
    min-width: 200px;
    width: 35vw;
  }
`;

const ContentMeta = styled.div`
  max-width: 874px;
`;

const Controls = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  margin: 24px 0px;
  min-height: 56px;
`;

const Player = styled.button`
  font-size: 15px;
  margin: 0px 22px 0px 0px;
  padding: 0px 24px;
  height: 56px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1.8px;
  text-align: center;
  text-transform: uppercase;
  background: rgb (249, 249, 249);
  border: none;
  color: rgb(0, 0, 0);
  img {
    width: 32px;
  }
  &:hover {
    background: rgb(198, 198, 198);
  }

  @media (max-width: 768px) {
    height: 45px;
    padding: 0px 12px;
    font-size: 12px;
    margin: 0px 10px 0px 0px;
    img {
      width: 25px;
    }
  }
`;

const Trailer = styled(Player)`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgb(249, 249, 249);
  color: rgb(249, 249, 249);
`;

const AddList = styled.div`
  margin-right: 16px;
  height: 44px;
  width: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  border: 2px solid white;
  cursor: pointer;
  span {
    background-color: rgb(249, 249, 249);
    display: inline-block;
    &:first-child {
      height: 2px;
      transform: translate(1px, 0px) rotate(0deg);
      width: 16px;
    }
    &:nth-child(2) {
      height: 16px;
      transform: translateX(-8px) rotate(0deg);
      width: 2px;
    }
  }
`;

const AddListAfter = styled.div`
  margin-right: 16px;
  margin-left: -60px;
  height: 44px;
  width: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  border: 2px solid white;
  cursor: pointer;
  span {
    background-color: rgb(249, 249, 249);
    display: inline-block;
    &:first-child {
      height: 2px;
      transform: translate(-8px, 2px) rotate(42deg);
      width: 16px;
    }
    &:nth-child(2) {
      height: 24px;
      transform: translateX(-4px) rotate(50deg);
      width: 2px;
    }
  }
`;

const SubTitle = styled.div`
  color: rgb(249, 249, 249);
  font-size: 15px;
  min-height: 20px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Description = styled.div`
  line-height: 1.4;
  font-size: 20px;
  padding: 16px 0px;
  color: rgb(249, 249, 249);

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;




export default Detail;