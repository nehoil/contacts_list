import {
  ArrowUpOutlined,
  LoadingOutlined,
  UserAddOutlined
} from "@ant-design/icons";
import { Select } from "antd";
import Search from "antd/lib/input/Search";
import "./ListActions.scss";

export default function ListActions({
  form,
  onFormChange,
  onAddContact,
  isAddingContact
}) {
  const getSortRotate = () => {
    return form.sortDirection === "asc" ? 0 : 180;
  };

  const onSortDirectionChange = () => {
    const sortDirection = form.sortDirection === "asc" ? "desc" : "asc";
    onChange("sortDirection", sortDirection);
  };

  const onChange = (type, value) => {
    onFormChange({
      ...form,
      [type]: value
    });
  };
  return (
    <div className="list-actions-container">
      <div className="list-actions-content glass-bg">
        <div className="add-contact-button" onClick={onAddContact}>
          {isAddingContact ? <LoadingOutlined /> : <UserAddOutlined />} Add
          Contact
        </div>
        <div className="sort-by-list">
          <ArrowUpOutlined
            className="sort-icon"
            rotate={getSortRotate()}
            onClick={onSortDirectionChange}
          />
          Sort by{" "}
          <Select
            defaultValue="First Name"
            style={{ width: 150 }}
            onChange={val => onChange("sortBy", val)}>
            <Select.Option value="firstName">First Name</Select.Option>
            <Select.Option value="daysToBirthday">
              Days Until Birthday
            </Select.Option>
          </Select>
        </div>
        <div className="search-filter">
          <Search
            placeholder="Search"
            value={form.search}
            onInput={ev => onChange("search", ev.target.value)}
            style={{ width: 200 }}
          />
        </div>
      </div>
    </div>
  );
}
