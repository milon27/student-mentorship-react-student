import React, { useContext, useState } from "react";
import Helper from "../../../utils/helpers/Helper";
import Input from "../../layouts/form/Input";
import MyModal from "../../layouts/modal/MyModal";
import AppAction from "./../../../utils/context/actions/AppAction";
import ListAction from "./../../../utils/context/actions/ListAction";
import { DispatchContext } from "./../../../utils/context/MainContext";
import CUser from "./../../../utils/helpers/CUser";
import Define from "./../../../utils/helpers/Define";
import Response from "./../../../utils/helpers/Response";
import '../../../assets/css/dashboard.css';

export default function NoticeModel({ show, setShow }) {
  const { appDispatch, notice_listDispatch } = useContext(DispatchContext);

  const initNotice = {
    publisher_id: CUser.getCurrentuser() && CUser.getCurrentuser().student_id,
    title: "",
    description: "",
    created_at: ""
  };
  const [Notice, setNotice] = useState(initNotice);

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
    const res = await listAction.addData("notice/create", Notice);
    appAction.SET_RESPONSE(res);
    setNotice((pState) => ({ ...pState, title: "", description: "" }))
  };

  const onChange = (e) => {
    setNotice({ ...Notice, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <MyModal
        title="Post New Notice"
        show={show}
        setShow={setShow}
        onSubmit={onSubmit}
      >
        <Input
          name="title"
          title="Notice Title"
          value={Notice.title}
          onChange={onChange}
        />
        <Input
          name="description"
          type="textarea"
          title="Description(If Any):"
          value={Notice.description}
          onChange={onChange}
        />
      </MyModal>
    </div>
  );
}
