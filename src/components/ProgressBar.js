import React from 'react';
import { Progress } from 'semantic-ui-react';

const ProgressBar = props => (
  <div>
    <div style={props.style}>
      <Progress
        style={styles.progressMarginFix}
        percent={props.percent}
        success={props.success}
        indicating
      />
      {props.children}
    </div>
  </div>
);

const styles = {
  progressMarginFix: {
    marginBottom: 0
  }
};

export default ProgressBar;
