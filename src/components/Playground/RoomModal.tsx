import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks"
import { Button, Modal, ModalContent, ModalFooter, ModalHeader, ModalBody, useDisclosure, Input } from "@heroui/react";
import { createRoom, disconnectRoom, joinRoom } from "../../context/socketSlice";

function RoomModal() {

  const isConnected = useAppSelector(state => state.socket.connected);
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();

  const handleCreateRoom = () => {
    console.log('The room id is :', value);
    onClose();
    dispatch(createRoom({roomId : value}));
  }

  const handleLeaveRoom = () => {
    dispatch(disconnectRoom());
    onClose();
  }

  const generateRoomId = () => {
    const id = [...crypto.getRandomValues(new Uint8Array(6))]
      .map(n => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"[n % 62])
      .join('');
    setValue(id);
  }

  useEffect(() => {
    generateRoomId();
  }, [])

  return (
    <>
      <Button onPress={onOpen}>{isConnected ? "Get out" : "Join Room"}</Button>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{isConnected ? "Get out" : "Create Room"}</ModalHeader>
              <ModalBody>
                {isConnected ? (
                  <>
                    <p>Get out of the room ?</p>
                  </>
                ) : (
                  <>
                    <Input
                      isReadOnly
                      value={value}
                      label="Room ID: "
                    />
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Close
                </Button>
                {
                  isConnected ? (
                    <Button color="danger" onPress={handleLeaveRoom}>Get out</Button>
                  ) : (
                    <Button color="success" onPress={handleCreateRoom}>Join Room</Button>
                  )
                }
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default RoomModal
