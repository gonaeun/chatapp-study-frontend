import {io} from "socket.io-client"
const socket = io("http://localhost:5004")   // 연결할 백엔드 주소
export default socket;