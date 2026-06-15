import { Fragment } from 'react';
import Card from '../common/Card';
import { riskColumns, riskLevels, riskProjects } from '../../data/dashboardData';
import { navigateHash } from '../../utils/routing';
import { riskFor, riskInitial } from '../../utils/risk';

export default function RiskHeatmap() {
  return (
    <Card title="Student lifecycle risk matrix - click any cell for details">
      <div className="heatmap">
        <div className="heatmap-head" />
        {riskColumns.map((column) => <div className="heatmap-head" key={column}>{column}</div>)}
        {riskProjects.map((project, rowIndex) => (
          <Fragment key={project}>
            <div className="heatmap-project">{project}</div>
            {riskColumns.map((column, colIndex) => {
              const risk = riskFor(rowIndex, colIndex);
              return (
                <button
                  className={`heat-cell ${risk}`}
                  key={`${project}-${column}`}
                  onClick={() => navigateHash('heatmap-detail', { project, dimension: column, risk, view: 'simple' })}
                  title={`${project} - ${column} - ${risk}`}
                >
                  {riskInitial(risk)}
                </button>
              );
            })}
          </Fragment>
        ))}
      </div>
      <div className="legend">
        {riskLevels.map((level) => <span key={level}><i className={level} />{level}</span>)}
      </div>
    </Card>
  );
}
