import { createContext, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { setOnlineUsers, setSocket } from "../redux/slices/socketSlice";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { socket, onlineUsers } = useSelector((state) => state.socket);

  // Connect socket io for client and set up event listeners
  useEffect(() => {
    if (currentUser) {
      const socket = io(`${import.meta.env.VITE_SERVER_URL}`);

      dispatch(setSocket(socket));

      socket.on("connect", () => {
        socket.emit("addUserIsOnline", currentUser?._id);
      });

      socket.on("getOnlineUsers", (users) => {
        dispatch(setOnlineUsers(users));
      });

      return () => {
        socket.off("getOnlineUsers");
        socket.close();
        dispatch(setSocket(null));
      };
    }
  }, [currentUser, dispatch]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
