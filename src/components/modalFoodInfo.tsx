import React from "react";
import { Modal, ModalOverlay, ModalContent, Button } from "@chakra-ui/react";
import FoodInfo from "./foodInfo";

interface ModalFoodInfoProps {
  foodId: number;
  quantity: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalFoodInfo({
  foodId,
  quantity,
  isOpen,
  onClose,
}: ModalFoodInfoProps) {
  return (
    <>
      <Modal
        size={"xl"}
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />

        <ModalContent alignItems={"center"}>
          <Button colorScheme="" onClick={onClose}>
            Fechar
          </Button>
          <FoodInfo foodId={foodId} portionSize={quantity} />
        </ModalContent>
      </Modal>
    </>
  );
}
