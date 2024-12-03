import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./dark-theme-quill.css";
import apiServices from "../../../services/apiServices";
import "./MessageTemplateEditor.css";

const MessageTemplateEditor = () => {
  const [formData, setFormData] = useState({
    templateName: "templateName",
    subject: "subject",
    htmlContent: "<h1>Hello {{name}}!</h1><p>{{message}}</p>",
  });
  const [selectId, setSelectId] = useState(1); // Seleccionar ID 1 por defecto
  const [mailTemplates, setMailTemplates] = useState([]);

  // Obtener plantillas al cargar el componente
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await apiServices.getMailTemplates();
        setMailTemplates(response);

        // Cargar la plantilla con ID inicial
        const defaultTemplate = response.find((template) => template.id === 1);
        if (defaultTemplate) {
          setFormData({
            templateName: defaultTemplate.templateName || "",
            subject: defaultTemplate.subject || "",
            htmlContent: defaultTemplate.htmlContent || "",
          });
        }
      } catch (error) {
        console.error("Error fetching mail templates:", error);
      }
    };

    fetchTemplates();
  }, []);

  // Manejar cambio de plantilla seleccionada
  const handleTemplateChange = async (e) => {
    const newId = parseInt(e.target.value, 10);
    setSelectId(newId); // Actualiza el ID seleccionado

    try {
      const response = await apiServices.getMailTemplateById(newId);
      setFormData({
        templateName: response.templateName || "",
        subject: response.subject || "",
        htmlContent: response.htmlContent || "",
      });
    } catch (error) {
      console.error("Error fetching selected mail template:", error);
    }
  };

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleEditorChange = (value) => {
    setFormData((prev) => ({ ...prev, htmlContent: value }));
  };

  const handleSubmitUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await apiServices.updateMailTemplate(selectId, formData);
      console.log("Template updated successfully:", response);
    } catch (error) {
      console.error("Error updating template:", error);
    }
  };

  const renderInput = (label, id, value, onChange) => (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input type="text" id={id} value={value} onChange={onChange} required />
    </div>
  );

  return (
    <div className="email-template-editor">
      <h1>Editar Plantilla de Correo Electrónico</h1>

      {/* Selector de plantillas */}
      <div className="form-group">
        <label htmlFor="templateSelect">Seleccionar Plantilla:</label>
        <select id="templateSelect" value={selectId} onChange={handleTemplateChange}>
          {mailTemplates.length === 0 ? (
            <option value="">No hay plantillas disponibles</option>
          ) : (
            mailTemplates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.id} - {template.templateName}
              </option>
            ))
          )}
        </select>
      </div>

      {/* Formulario para editar la plantilla */}
      <form onSubmit={handleSubmitUpdate}>
        {renderInput("Nombre de la Plantilla:", "templateName", formData.templateName, handleChange("templateName"))}
        {renderInput("Asunto:", "subject", formData.subject, handleChange("subject"))}

        <div className="form-group">
          <label htmlFor="htmlContent">Contenido HTML:</label>
          <ReactQuill value={formData.htmlContent} onChange={handleEditorChange} theme="snow" />
        </div>

        <button type="submit">Guardar Plantilla</button>
      </form>
    </div>
  );
};

export default MessageTemplateEditor;
