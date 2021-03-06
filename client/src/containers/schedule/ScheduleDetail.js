import React from "react";
import { Form, Button } from "antd";
import PropTypes from "prop-types";
import ScheduleService from "../../services/ScheduleService";
import NotificationService from "../../services/NotificationService";

export default class ScheduleDetail extends React.Component {
  state = {
    loading: false,
  };

  onActivate = () => {
    this.setState({
      loading: true,
    });
    ScheduleService.activateSchedule(this.props.schedule.id)
      .then(
        () => {
          this.props.updateEventsList();
          NotificationService.notify(
            "success",
            "Successfully activated schedule"
          );
        },
        (error) => {
          NotificationService.notify(
            "error",
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
              error.message ||
              error.toString()
          );
        }
      )
      .then(() => {
        this.setState({
          loading: false,
        });
      });
  };

  onDelete = () => {
    this.setState({
      loading: true,
    });
    ScheduleService.deleteSchedule(this.props.schedule.id)
      .then(
        () => {
          this.props.updateEventsList();
          NotificationService.notify(
            "success",
            "Successfully deleted schedule"
          );
        },
        (error) => {
          NotificationService.notify(
            "error",
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
              error.message ||
              error.toString()
          );
        }
      )
      .then(() => {
        this.setState({
          loading: false,
        });
      });
  };

  render() {
    return (
      <Form name="schedule_controls" layout={"inline"}>
        {!this.props.schedule.isActive && (
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={this.onActivate}>
              Mark Active
            </Button>
          </Form.Item>
        )}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            onClick={this.onDelete}
            danger
          >
            Delete
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

ScheduleDetail.propTypes = {
  schedule: PropTypes.object,
  updateEventsList: PropTypes.func,
};
