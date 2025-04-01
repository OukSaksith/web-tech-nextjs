import { Field } from 'formik';

interface FormFieldProps {
    label: string;
    name: string;
    errors: any;
    submitCount: number;
    type?: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, name, errors, submitCount, type = "text" }) => (
    <div className={submitCount ? (errors[name] ? 'has-error' : 'has-success') : ''}>
        <label htmlFor={name}>{label}</label>
        <Field name={name} type={type} id={name} placeholder={`Enter ${label}`} className="form-input" />
        {submitCount && errors[name] ? <div className="mt-1 text-danger">{errors[name]}</div> : null}
    </div>
);

export default FormField;
