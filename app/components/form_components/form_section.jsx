// This component is a form field that can be used in various forms. It includes a label, an input field, an icon, and error handling.

const FormSection = ({ title, children }) => {
    return (
      <div className="flex flex-col gap-3">
        {title && <h2 className="text-base lg:text-lg font-bold text-[#333333]">{title}</h2>}
        {children}
      </div>
    )
}

export default FormSection;