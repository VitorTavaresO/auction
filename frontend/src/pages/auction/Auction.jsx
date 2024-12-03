import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Toast } from "primereact/toast";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import AuctionService from "../../services/AuctionService";
import CategoryService from "../../services/CategoryService";
import api from "../../config/axiosConfig";
import { useTranslation } from "react-i18next";

const Auction = () => {
  const { t } = useTranslation();
  const [auctions, setAuctions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [auction, setAuction] = useState({
    title: "",
    description: "",
    startDateTime: null,
    endDateTime: null,
    status: "",
    observation: "",
    incrementValue: 0,
    minimumBid: 0,
    category: null,
    images: [],
  });
  const [dialogVisible, setDialogVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageDialogVisible, setImageDialogVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrls, setImageUrls] = useState({});
  const toast = useRef(null);

  const auctionService = new AuctionService();
  const categoryService = new CategoryService();

  useEffect(() => {
    loadAuctions();
    loadCategories();
  }, []);

  const loadAuctions = async () => {
    setLoading(true);
    try {
      const data = await auctionService.list();
      setAuctions(data);
      loadImages(data);
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: t("error.generic"),
        detail: t("auction.fetchError"),
      });
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await categoryService.list();
      setCategories(data);
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: t("error.generic"),
        detail: t("category.fetchError"),
      });
    }
  };

  const loadImages = async (auctions) => {
    const urls = {};
    for (const auction of auctions) {
      for (const image of auction.images) {
        const url = await fetchImage(image.path);
        urls[image.path] = url;
      }
    }
    setImageUrls(urls);
  };

  const fetchImage = async (path) => {
    try {
      const response = await api.get(`/uploads/${path}`, {
        responseType: "blob",
      });
      const url = URL.createObjectURL(response.data);
      return url;
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  };

  const openNew = () => {
    setAuction({
      title: "",
      description: "",
      startDateTime: null,
      endDateTime: null,
      status: "",
      observation: "",
      incrementValue: 0,
      minimumBid: 0,
      category: null,
      images: [],
    });
    setDialogVisible(true);
    setIsEdit(false);
  };

  const hideDialog = () => {
    setDialogVisible(false);
  };

  const saveAuction = async () => {
    try {
      let createdAuction;
      if (isEdit) {
        createdAuction = await auctionService.update(auction);
        toast.current.show({
          severity: "success",
          summary: t("success"),
          detail: t("auction.updateSuccess"),
        });
      } else {
        createdAuction = await auctionService.create(auction);
        toast.current.show({
          severity: "success",
          summary: t("success"),
          detail: t("auction.createSuccess"),
        });
      }
      if (auction.images.length > 0) {
        await uploadImages(createdAuction.id);
      }
      loadAuctions();
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: t("error.generic"),
        detail: isEdit ? t("auction.updateError") : t("auction.createError"),
      });
    } finally {
      hideDialog();
    }
  };

  const uploadImages = async (auctionId) => {
    const formData = new FormData();
    auction.images.forEach((image) => {
      formData.append("images", image);
    });
    formData.append("auctionId", auctionId);
    await auctionService.uploadImages(formData);
  };

  const onUpload = (e) => {
    const uploadedFiles = e.files;
    setAuction({ ...auction, images: [...auction.images, ...uploadedFiles] });
  };

  const editAuction = (auction) => {
    setAuction({ ...auction });
    setDialogVisible(true);
    setIsEdit(true);
  };

  const confirmDeleteAuction = (auction) => {
    confirmDialog({
      message: t("auction.deleteConfirm", { title: auction.title }),
      header: t("auction.deleteHeader"),
      icon: "pi pi-exclamation-triangle",
      accept: () => deleteAuction(auction),
    });
  };

  const deleteAuction = async (auction) => {
    try {
      await auctionService.delete(auction.id);
      toast.current.show({
        severity: "warn",
        summary: t("success"),
        detail: t("auction.deleteSuccess"),
      });
      loadAuctions();
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: t("error.generic"),
        detail: t("auction.deleteError"),
      });
    }
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => editAuction(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger"
          onClick={() => confirmDeleteAuction(rowData)}
        />
      </div>
    );
  };

  const categoryBodyTemplate = (rowData) => {
    return rowData.category ? rowData.category.name : "";
  };

  const dateTimeBodyTemplate = (rowData, field) => {
    const date = new Date(rowData[field]);
    const formattedDate = date.toLocaleDateString("pt-BR");
    const formattedTime = date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <div>
        <div>{formattedDate}</div>
        <div>{formattedTime}</div>
      </div>
    );
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <div>
        {rowData.images.map((image, index) => (
          <img
            key={index}
            src={imageUrls[image.path] || ""}
            alt={`Auction Image ${index}`}
            style={{
              width: "100px",
              height: "100px",
              marginRight: "10px",
              cursor: "pointer",
            }}
            onClick={() => openImageDialog(imageUrls[image.path] || "")}
          />
        ))}
      </div>
    );
  };

  const openImageDialog = (imagePath) => {
    setSelectedImage(imagePath);
    setImageDialogVisible(true);
  };

  const hideImageDialog = () => {
    setImageDialogVisible(false);
    setSelectedImage(null);
  };

  const dialogFooter = (
    <div>
      <Button
        label={t("auction.cancel")}
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label={t("auction.save")}
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveAuction}
      />
    </div>
  );

  return (
    <div className="p-grid p-justify-center h-screen">
      <Toast ref={toast} />
      <ConfirmDialog acceptLabel="Sim" rejectLabel="Não" />

      <div className="p-col-12 p-md-6 p-lg-4 mb-3" style={{ padding: "10px" }}>
        <Button
          label={t("auction.new")}
          icon="pi pi-plus"
          className="p-button-warning"
          style={{
            backgroundColor: "#ffd700",
            borderColor: "#ffd700",
            color: "#000",
          }}
          onClick={openNew}
        />
      </div>

      <DataTable
        value={auctions}
        loading={loading}
        className="p-datatable-striped p-datatable-gridlines"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        emptyMessage={t("auction.emptyMessage")}
      >
        <Column field="title" header={t("auction.title")} sortable></Column>
        <Column
          field="description"
          header={t("auction.description")}
          sortable
        ></Column>
        <Column
          field="category"
          header={t("auction.category")}
          body={categoryBodyTemplate}
          sortable
        ></Column>
        <Column
          field="startDateTime"
          header={t("auction.startDateTime")}
          body={(rowData) => dateTimeBodyTemplate(rowData, "startDateTime")}
          sortable
        ></Column>
        <Column
          field="endDateTime"
          header={t("auction.endDateTime")}
          body={(rowData) => dateTimeBodyTemplate(rowData, "endDateTime")}
          sortable
        ></Column>
        <Column
          field="minimumBid"
          header={t("auction.minimumBid")}
          sortable
        ></Column>
        <Column
          field="images"
          header={t("auction.images")}
          body={imageBodyTemplate}
        ></Column>
        <Column
          body={actionBodyTemplate}
          header={t("auction.actions")}
        ></Column>
      </DataTable>

      <Dialog
        visible={dialogVisible}
        style={{ width: "30vw" }}
        header={isEdit ? t("auction.edit") : t("auction.new")}
        modal
        footer={dialogFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="title">{t("auction.title")}</label>
          <InputText
            id="title"
            value={auction.title}
            onChange={(e) => setAuction({ ...auction, title: e.target.value })}
            required
            className="w-full"
          />
        </div>
        <div className="field">
          <label htmlFor="description">{t("auction.description")}</label>
          <InputText
            id="description"
            value={auction.description}
            onChange={(e) =>
              setAuction({ ...auction, description: e.target.value })
            }
            className="w-full"
          />
        </div>
        <div className="field">
          <label htmlFor="startDateTime">{t("auction.startDateTime")}</label>
          <Calendar
            id="startDateTime"
            value={auction.startDateTime}
            onChange={(e) => setAuction({ ...auction, startDateTime: e.value })}
            showTime
            dateFormat="dd/mm/yy"
            hourFormat="24"
            required
            className="w-full"
          />
        </div>
        <div className="field">
          <label htmlFor="endDateTime">{t("auction.endDateTime")}</label>
          <Calendar
            id="endDateTime"
            value={auction.endDateTime}
            onChange={(e) => setAuction({ ...auction, endDateTime: e.value })}
            showTime
            dateFormat="dd/mm/yy"
            hourFormat="24"
            required
            className="w-full"
          />
        </div>
        <div className="field">
          <label htmlFor="status">{t("auction.status")}</label>
          <InputText
            id="status"
            value={auction.status}
            onChange={(e) => setAuction({ ...auction, status: e.target.value })}
            required
            className="w-full"
          />
        </div>
        <div className="field">
          <label htmlFor="observation">{t("auction.observation")}</label>
          <InputText
            id="observation"
            value={auction.observation}
            onChange={(e) =>
              setAuction({ ...auction, observation: e.target.value })
            }
            className="w-full"
          />
        </div>
        <div className="field">
          <label htmlFor="incrementValue">{t("auction.incrementValue")}</label>
          <InputNumber
            id="incrementValue"
            value={auction.incrementValue}
            onValueChange={(e) =>
              setAuction({ ...auction, incrementValue: e.value })
            }
            mode="currency"
            currency="BRL"
            locale="pt-BR"
            required
            className="w-full"
          />
        </div>
        <div className="field">
          <label htmlFor="minimumBid">{t("auction.minimumBid")}</label>
          <InputNumber
            id="minimumBid"
            value={auction.minimumBid}
            onValueChange={(e) =>
              setAuction({ ...auction, minimumBid: e.value })
            }
            mode="currency"
            currency="BRL"
            locale="pt-BR"
            required
            className="w-full"
          />
        </div>
        <div className="field">
          <label htmlFor="category">{t("auction.category")}</label>
          <Dropdown
            id="category"
            value={auction.category}
            options={categories}
            onChange={(e) => setAuction({ ...auction, category: e.value })}
            optionLabel="name"
            placeholder={t("auction.category")}
            className="w-full"
          />
        </div>
        <div className="field">
          <label htmlFor="images">{t("auction.images")}</label>
          <FileUpload
            name="images"
            multiple
            accept="image/*"
            maxFileSize={1000000}
            customUpload
            uploadHandler={onUpload}
            auto
          />
        </div>
      </Dialog>

      <Dialog
        visible={imageDialogVisible}
        style={{ width: "50vw" }}
        header={t("auction.image")}
        modal
        onHide={hideImageDialog}
      >
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Selected Auction Image"
            style={{ width: "100%", height: "auto" }}
          />
        )}
      </Dialog>
    </div>
  );
};

export default Auction;
