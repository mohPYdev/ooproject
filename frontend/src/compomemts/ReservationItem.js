import React, { useEffect, useState } from 'react'
import './ReservationItem'

import { LocalUrl } from '../utils/constant'

import { useFetch } from '../hooks/useFetch'
export default function ReservationItem({ res_id, doc_id, shift_id, service_id, time_date, deleteItem, code, status }) {

  const message = React.lazy(()=>import('antd'))
  const Popconfirm = React.lazy(()=>import('antd'))
  const Modal = React.lazy(()=>import('antd'))
  const QRCode = React.lazy(()=>import('antd'))


  const { data: item } = useFetch(LocalUrl + `items/${doc_id}/`)
  const { data: shift } = useFetch(LocalUrl + `shifts/${shift_id}/`)
  const { data: service } = useFetch(LocalUrl + `services/${service_id}/`)
  const { deleteData, data } = useFetch(LocalUrl + `reservations/${res_id}/`, 'DELETE')

  const [info, setInfo] = useState('')
  const [td, setTd] = useState('')
  const [sd, setSd] = useState('')
  const [passed, setPassed] = useState(false)

  // qr code
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //end


  // delete process
  const [open, setOpen] = useState(false);

  const confirm = () => {
    setOpen(false);
    deleteData()
    message.success('با موفقیت حذف شد');
  };

  const cancel = () => {
    setOpen(false);
  };

  const handleDelete = (e) => {
    e.preventDefault()
    setOpen(true)
  }
  // end of delete process

  useEffect(() => {
    if (data) {
      deleteItem(res_id)
    }
  }, [data, deleteItem, res_id]);

  useEffect(() => {

    if (shift && service) {
      const date = new Date(`${time_date}`);
      const faDate = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric"
      }).format(date);
      setInfo(faDate)

      const td = new Date(`${time_date}`);
      const ftd = new Intl.DateTimeFormat("en", {
        hour: "2-digit",
        minute: "2-digit"
      }).format(td);
      setTd(ftd)

      const sd = new Date(`2022-4-4 ${service.duration}`);
      const fsd = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      }).format(sd);
      setSd(fsd)

      if (new Date(Date.now()) > new Date(time_date)) {
        setPassed(true)
      }


    }
  }, [service, shift, time_date])

  return (
    <>
      <tr >
        <td>
          <div className="d-flex align-items-center">

            <div className="ms-3">
              <p className="fw-bold mb-1">{item?.first_name}  {item?.last_name}</p>
              <p className="text-muted mb-0">{item?.category}</p>
            </div>
          </div>
        </td>
        <td>
          <p className="fw-normal mb-1">{service?.name}</p>
          <p className="text-muted mb-0">{service?.duration.split(":")[0] === "00" ? `${sd.split(":")[1]} minutes` : `${sd} hours`}</p>
        </td>

        <td>
          <p className="fw-normal mb-1">{td}</p>
          <p className="text-muted mb-0">{info}</p>
        </td>

        <td>
          <p className="fw-normal mb-1">{code}</p>
        </td>

        <td>
          {status == 'review' && <p className="fw-normal mb-1 text-warning">{status}</p>}
          {status == 'not accepted' && <p className="fw-normal mb-1 text-danger">{status}</p>}
          {status == 'accepted' && <p className="fw-normal mb-1 text-success">{status}</p>}
        </td>

        <td>
          <Popconfirm
            title="حذف رزرو"
            description="آیا می خواهید نوبت خود را حذف کنید؟"
            open={open}
            placement="right"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            {!passed && <button type="button" style={{ margin: '10px', width: '100%' }} className="btn btn-danger" onClick={(e) => handleDelete(e)}>حذف</button>}
          </Popconfirm>
          <button type="button" className="btn btn-danger" style={{ margin: '10px', width: '100%' }} onClick={showModal}>QR</button>
        </td>
      </tr>
      <Modal title="QR Code" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}>
        <QRCode value={code}
          style={{ margin: 'auto auto' }}
        />
      </Modal>
    </>
  )
}
