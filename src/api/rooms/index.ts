import { Router } from "express";

import { createRoom } from "./createRoom";
import { deleteRoom } from "./deleteRoom";
import { editRoomConfig } from "./editRoomConfig";
import { getRoom } from "./getRoom";
import { paginateRooms } from "./paginateRooms";
import { updateRoom } from "./updateRoom";

import { createRoomValidation } from "./validator/createRoomValidation";
import { deleteRoomValidation } from "./validator/deleteRoomValidation";
import { editRoomConfigValidation } from "./validator/editRoomConfigValidation";
import { getRoomValidation } from "./validator/getRoomValidation";
import { paginateRoomsValidation } from "./validator/paginateRoomsValidation";
import { updateRoomValidation } from "./validator/updateRoomValidation";


const roomsRouter = Router();

roomsRouter.get("/paginate", paginateRoomsValidation, paginateRooms);

roomsRouter.get("/", getRoomValidation, getRoom);

roomsRouter.post("/", createRoomValidation, createRoom);

roomsRouter.put("/:id", updateRoomValidation, updateRoom);

roomsRouter.delete("/:id", deleteRoomValidation, deleteRoom);

roomsRouter.put("/:id/config", editRoomConfigValidation, editRoomConfig);

export default roomsRouter;
