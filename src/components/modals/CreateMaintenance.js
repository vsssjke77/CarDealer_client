import React, {useContext, useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {Context} from "../../index";
import {createMaintenance} from "../../http/maintenanceAPI";

const CreateMaintenance = ({show, onHide}) => {
    const {part, car, brand} = useContext(Context);

    const [selectedPartInfo, setSelectedPartInfo] = useState();
    const [selectedCarInfo, setSelectedCarInfo] = useState('Выберите автомобиль');
    const [selectedPart, setSelectedPart] = useState('Выберите деталь');
    const [selectedCar, setSelectedCar] = useState('Выберите автомобиль');
    const [installationDate, setInstallationDate] = useState('');
    const [partCount, setPartCount] = useState('');

    const handleSelectPart = (id, name) => {
        setSelectedPartInfo(name);
        setSelectedPart(id);
    };
    const handleSelectCar = (id, brand, model, vin) => {
        setSelectedCarInfo(id + ', ' + brand + ' ' + model + ' ' + vin);
        setSelectedCar(id);
    };

    const handleSubmit = async () => {
        try {
            await createMaintenance(installationDate, partCount, selectedCar, selectedPart);
            setSelectedPartInfo();
            setSelectedCarInfo('Выберите автомобиль')
            setSelectedPart('Выберите деталь')
            setSelectedCar('Выберите автомобиль')
            setInstallationDate('')
            setPartCount('')
            onHide(); // Закрытие модального окна после успешного добавления
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert('Ошибка при добавлении записи ТО');
            }
        }
    };

    const handleClose = () => {
        setSelectedCarInfo('Выберите автомобиль')
        setSelectedPart('Выберите деталь')
        setSelectedCar('Выберите автомобиль')
        setInstallationDate('')
        setPartCount('')
        onHide(); // Закрытие модального окна после успешного добавления

    };

    const handleKeyDown = (e) => {
        if (e.key === '-' || e.key === 'e' || e.key === 'E' || e.key === '+'|| e.key === '/' || e.key === '*') {
            e.preventDefault();
        }
    };


    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить новую запись ТО
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onHide}>
                    <Form.Control
                        className={"mt-2"}
                        placeholder={"Введите дату установки"}
                        type={"date"}
                        value={installationDate}
                        onChange={(e) => setInstallationDate(e.target.value)}

                    />
                    <Form.Control
                        className={"mt-2"}
                        placeholder={"Введите количество деталей"}
                        type={"number"}
                        value={partCount}
                        onChange={(e) => setPartCount(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <Dropdown className={"mt-2"}>
                        <Dropdown.Toggle>{selectedPartInfo || 'Выберите деталь'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {part.parts.map((part) => (
                                <Dropdown.Item key={part.id} onClick={() => handleSelectPart(part.id, part.name)}>
                                    {part.name}
                                </Dropdown.Item>
                            ))}

                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown className={'mt-2'}>
                        <Dropdown.Toggle>{'id: ' + selectedCarInfo}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {car.cars.map((car) => (
                                <Dropdown.Item key={car.id}
                                               onClick={() => handleSelectCar(car.id, brand.getBrandTitleById(car.brand_id), car.model, car.vin)}>
                                    {'id: ' + car.id + ', ' + brand.getBrandTitleById(car.brand_id) + ' ' + car.model + ' ' + car.vin}
                                </Dropdown.Item>
                            ))}

                        </Dropdown.Menu>
                    </Dropdown>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={handleClose}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={handleSubmit}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateMaintenance;