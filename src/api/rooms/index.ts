import { Router } from "express";

import {
  createRoomValidation,
  deleteRoomValidation,
  editRoomConfigValidation,
  getRoomValidation,
  paginateRoomsValidation,
  updateRoomValidation,
} from "./validator/roomsValidators";

import {
  createRoom,
  deleteRoom,
  editRoomConfig,
  getRoom,
  paginateRooms,
  updateRoom,
} from "./controllers/roomsControllers";

const roomsRouter = Router();

roomsRouter.get("/paginate", paginateRoomsValidation, paginateRooms);

roomsRouter.get("/", getRoomValidation, getRoom);

roomsRouter.post("/", createRoomValidation, createRoom);

roomsRouter.put("/:id", updateRoomValidation, updateRoom);

roomsRouter.delete("/:id", deleteRoomValidation, deleteRoom);

roomsRouter.put("/:id/config", editRoomConfigValidation, editRoomConfig);

export default roomsRouter;
