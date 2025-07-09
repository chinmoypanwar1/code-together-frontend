import { Button, Modal, ModalBody, ModalHeader, ModalContent, ModalFooter, useDisclosure, Input } from "@heroui/react"
import { useState } from "react";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { joinRoom } from "../../context/socketSlice";
import { useNavigate } from "react-router";
import { setInitialDocument } from "../../context/yjsSlice";

function JoinRoomModal() {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [roomId, setRoomId] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleJoinRoom = () => {
    console.log(roomId);
    dispatch(setInitialDocument());
    dispatch(joinRoom({roomId: roomId}));
    navigate(`/playground?visitor=true&roomId=${roomId}`);
  }

  return (
    <>
      <Button onPress={onOpen}>Join Room</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Join Room</ModalHeader>
              <ModalBody>
                <Input
                  label="Room ID : "
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="success" onPress={handleJoinRoom}>
                  Join Room
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default JoinRoomModal
