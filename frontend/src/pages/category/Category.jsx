import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import CategoryService from "../../services/CategoryService";
import { useTranslation } from "react-i18next";

const Category = () => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({ name: "", observation: "" });
  const [dialogVisible, setDialogVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const toast = useRef(null);

  const categoryService = new CategoryService();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await categoryService.list();
      setCategories(data);
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: t("error.generic"),
        detail: t("category.fetchError"),
      });
    } finally {
      setLoading(false);
    }
  };

  const openNew = () => {
    setCategory({ name: "", observation: "" });
    setDialogVisible(true);
    setIsEdit(false);
  };

  const hideDialog = () => {
    setDialogVisible(false);
  };

  const saveCategory = async () => {
    try {
      if (isEdit) {
        await categoryService.update(category);
        toast.current.show({
          severity: "success",
          summary: t("success"),
          detail: t("category.updateSuccess"),
        });
      } else {
        await categoryService.create(category);
        toast.current.show({
          severity: "success",
          summary: t("success"),
          detail: t("category.createSuccess"),
        });
      }
      loadCategories();
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: t("error.generic"),
        detail: isEdit ? t("category.updateError") : t("category.createError"),
      });
    } finally {
      hideDialog();
    }
  };

  const editCategory = (category) => {
    setCategory({ ...category });
    setDialogVisible(true);
    setIsEdit(true);
  };

  const confirmDeleteCategory = (category) => {
    confirmDialog({
      message: t("category.deleteConfirm", { name: category.name }),
      header: t("category.deleteHeader"),
      icon: "pi pi-exclamation-triangle",
      accept: () => deleteCategory(category),
    });
  };

  const deleteCategory = async (category) => {
    try {
      await categoryService.delete(category.id);
      toast.current.show({
        severity: "warn",
        summary: t("success"),
        detail: t("category.deleteSuccess"),
      });
      loadCategories();
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: t("error.generic"),
        detail: t("category.deleteError"),
      });
    }
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => editCategory(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger"
          onClick={() => confirmDeleteCategory(rowData)}
        />
      </>
    );
  };

  const dialogFooter = (
    <div>
      <Button
        label={t("category.cancel")}
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label={t("category.save")}
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveCategory}
      />
    </div>
  );

  return (
    <div className="p-grid p-justify-center h-screen">
      <Toast ref={toast} />
      <ConfirmDialog acceptLabel="Sim" rejectLabel="Não" />

      <div className="p-col-12 p-md-6 p-lg-4 mb-3" style={{ padding: "10px" }}>
        <Button
          label={t("category.new")}
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
        value={categories}
        loading={loading}
        className="p-datatable-striped p-datatable-gridlines"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        emptyMessage={t("category.emptyMessage")}
      >
        <Column field="name" header={t("category.name")} sortable></Column>
        <Column
          field="observation"
          header={t("category.observation")}
          sortable
        ></Column>
        <Column
          body={actionBodyTemplate}
          header={t("category.actions")}
        ></Column>
      </DataTable>

      <Dialog
        visible={dialogVisible}
        style={{ width: "30vw" }}
        header={isEdit ? t("category.edit") : t("category.new")}
        modal
        footer={dialogFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="name">{t("category.name")}</label>
          <InputText
            id="name"
            value={category.name}
            onChange={(e) => setCategory({ ...category, name: e.target.value })}
            required
            className="w-full"
          />
        </div>
        <div className="field">
          <label htmlFor="observation">{t("category.observation")}</label>
          <InputText
            id="observation"
            value={category.observation}
            onChange={(e) =>
              setCategory({ ...category, observation: e.target.value })
            }
            className="w-full"
          />
        </div>
      </Dialog>
    </div>
  );
};

export default Category;
