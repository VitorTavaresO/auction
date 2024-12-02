import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import AuctionService from "../../services/AuctionService";
import { useTranslation } from "react-i18next";

const Auction = () => {
  const { t } = useTranslation();
  const [auctions, setAuctions] = useState([]);
  const [auction, setAuction] = useState({ title: "", description: "" });
  const [dialogVisible, setDialogVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const toast = useRef(null);

  const auctionService = new AuctionService();

  useEffect(() => {
    loadAuctions();
  }, []);

  const loadAuctions = async () => {
    setLoading(true);
    try {
      const data = await auctionService.list();
      setAuctions(data);
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

  const openNew = () => {
    setAuction({ title: "", description: "" });
    setDialogVisible(true);
    setIsEdit(false);
  };

  const hideDialog = () => {
    setDialogVisible(false);
  };

  const saveAuction = async () => {
    try {
      if (isEdit) {
        await auctionService.update(auction);
        toast.current.show({
          severity: "success",
          summary: t("success"),
          detail: t("auction.updateSuccess"),
        });
      } else {
        await auctionService.create(auction);
        toast.current.show({
          severity: "success",
          summary: t("success"),
          detail: t("auction.createSuccess"),
        });
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
      <>
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
      </>
    );
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
      </Dialog>
    </div>
  );
};

export default Auction;
