import styled from "styled-components";
import { selectList } from "../features/list/listSlice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import db from "../firebase";
import { setList } from "../features/list/listSlice";

const WatchList = () => {
  const dispatch = useDispatch();
  let watchLists = [];
  const [makeItHappen, setMakeItHappen] =useState([])
  const [show, setShow] = useState(true);
  const lists = useSelector(selectList);

  useEffect(() => {
    db.collection("lists")
    .onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        watchLists = [...watchLists, { id: doc.id, ...doc.data() }];
        console.log('watchLists: ', watchLists)
      });
      setMakeItHappen(watchLists)
      dispatch(
        setList({
          watchList: watchLists,
        })
      );
    });
    
  }, [makeItHappen]);

  const removeFromWatchList = async (id) => {
    await db
      .collection("lists")
      .doc(id)
      .delete()
      .then(() => {
        console.log("successfully removed");
      })
      .catch((error) => {
        console.error("", error);
      });
      console.log(id)
    setShow(!show);
  };

  return (
    <Container>
      <h4>Watch List</h4>
      <Content>
        {lists &&
          lists.map((list, key) => (
            <Wrap key={key}>
              {list.id}
              <Link to={`/detail/` + list.id}>
                <img src={list.cardImg} alt={list.title} />
              </Link>
              <Remove
                onClick={() => {
                  removeFromWatchList(list.id);
                }}
              >
                <img src="/images/remove.png" alt="remove-btn" />
              </Remove>
            </Wrap>
          ))}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
`;

const Content = styled.div`
  display: grid;
  grid-gap: 40px;
  gap: 40px;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Wrap = styled.div`
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgba(249, 249, 249, 0.1);
  width: 106%;

  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 1;
    top: 0;
  }
  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;

const Remove = styled.button`
  img {
    /* margin-left: 300px; */
    left: 90%;
    margin-top: 10px;
    width: 25px;
    height: 25px;
    z-index: 1;

    &:hover {
      cursor: pointer;
    }
  }
`;

export default WatchList;
