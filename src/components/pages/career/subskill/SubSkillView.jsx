import React from 'react'
import Input from '../../../layouts/form/Input';
import ModalView from '../../../layouts/modal/ModalView';

export default function SubSkillView({ show, setShow, viewItem }) {
    const onSubmit = async () => {
        setShow(false);
    };

    const onChange = (e) => { };

    return (
        <div>
            <ModalView
                title="Sub SKill"
                show={show}
                setShow={setShow}
                onSubmit={onSubmit}
            >
                <Input name="" title="" value={viewItem.title} onChange={onChange} disable />
                <Input
                    name=""
                    type="textarea"
                    title=""
                    value={viewItem.task}
                    onChange={onChange}
                    disable={true}
                />


                {/* <Input
                    name=""
                    title=""
                    value={`Posted On ${moment(viewItem.created_at).format(
                        Define.FORMAT_DATE
                    )}`}
                    onChange={onChange}
                    disable
                />
                <Input
                    name=""
                    type="textarea"
                    title=""
                    value={viewItem.description}
                    onChange={onChange}
                    disable
                /> */}
            </ModalView>
        </div>
    );
}