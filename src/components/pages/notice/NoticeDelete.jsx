import React, { useContext, useState } from "react";
import Helper from "../../../utils/helpers/Helper";
import Input from "../../layouts/form/Input";
import AppAction from "./../../../utils/context/actions/AppAction";
import ListAction from "./../../../utils/context/actions/ListAction";
import { DispatchContext } from "./../../../utils/context/MainContext";
import Define from "./../../../utils/helpers/Define";
import Response from "./../../../utils/helpers/Response";
import '../../../assets/css/dashboard.css';
import ModalDelete from "../../layouts/modal/ModalDelete";

export default function NoticeUpdate({ show, setShow,viewItem }) {
  const { appDispatch, notice_listDispatch } = useContext(DispatchContext);

  const [Notice, setNotice] = useState(viewItem);

  const onSubmit = async () => {
    //hide the modal
    setShow(false);
    //validation
    const appAction = new AppAction(appDispatch);
    if (!Helper.validateField(Notice.title, Notice.description)) {
      appAction.SET_RESPONSE(
        Response(false, "Enter all filed", "", Define.BT_DANGER, {})
      );
      return;
    }
    //call api
    const listAction = new ListAction(notice_listDispatch);
    const res = await listAction.deleteData(`notice/${viewItem.id}`, Notice);
    appAction.SET_RESPONSE(res);
  };

  const onChange = (e) => {
    setNotice({ ...Notice, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <ModalDelete
        title="Delete Notice"
        show={show}
        setShow={setShow}
        onSubmit={onSubmit}
      >
        <Input
          name="title"
          title=""
          value={Notice.title}
          onChange={onChange}
        />
        <Input
          name="description"
          type="textarea"
          title=""
          value={Notice.description}
          onChange={onChange}
        />
      </ModalDelete>
    </div>
  );
}
