import React, {useContext, useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {deleteBrand} from "../../http/brandAPI";
import {Context} from "../../index";

const DeleteBrand = ({show, onHide, onBrandChanged}) => {
    const {brand} = useContext(Context)
    const [selectedBrand, setSelectedBrand] = React.useState('Выбрите марку');
    const [selectedBrandId, setSelectedBrandId] = useState(0);


    const handleSelect = (brandId, brandTitle) => {
        setSelectedBrand(brandTitle);
        setSelectedBrandId(brandId)
    };
    const handleSubmit = async () => {
        try {
            await deleteBrand(selectedBrandId);
            setSelectedBrand('Выбрите марку');
            onHide(); // Закрытие модального окна после успешного добавления
            onBrandChanged();
        } catch (error) {
            console.error("Ошибка при удалении марки:", error);
            // Добавьте обработку ошибки, если необходимо
        }
    };
    const handleExit = async () => {
        onHide();
        setSelectedBrand('Выбрите марк');
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
          size="lg"
          centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удалить марку
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onHide}>
                    <Dropdown>
                        <Dropdown.Toggle>{selectedBrand}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {brand.brands.map((brand) => (
                                <Dropdown.Item key={brand.id} onClick={() => handleSelect(brand.id, brand.title)}>
                                    {brand.title}
                                </Dropdown.Item>
                            ))}

                        </Dropdown.Menu>
                    </Dropdown>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={handleExit } >Закрыть</Button>
                <Button variant={"outline-success"} onClick={handleSubmit}>Удалить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteBrand;