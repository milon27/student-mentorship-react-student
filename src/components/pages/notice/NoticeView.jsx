import moment from "moment";
import React from "react";
import "../../../assets/css/dashboard.css";
import Define from "../../../utils/helpers/Define";
import Input from "../../layouts/form/Input";
import ModalView from "../../layouts/modal/ModalView";

export default function NoticeModel({ show, setShow, viewItem }) {
  const onSubmit = async () => {
    setShow(false);
  };

  const onChange = (e) => { };

  return (
    <div>
      <ModalView
        title="Notice"
        show={show}
        setShow={setShow}
        onSubmit={onSubmit}
      >
        <Input name="" title="" value={viewItem.title} onChange={onChange} disable={true} />
        <Input
          name=""
          title=""
          value={`Posted On ${moment(viewItem.created_at).format(
            Define.FORMAT_DATE
          )}`}
          onChange={onChange}
          disable={true}
        />
        <Input
          name=""
          type="textarea"
          title=""
          value={viewItem.description}
          onChange={onChange}
          disable={true}
        />
      </ModalView>
    </div>
  );
}
