import React from 'react';
import useFormApi from '@data-driven-forms/react-form-renderer/use-form-api';
import { Stack, StackItem, Grid, GridItem, Text, TextVariants } from '@patternfly/react-core';
import './review.scss';

const stickyTable = (columns, rows) => (
  <div className="rbac-c-sticky">
    <Grid className="rbac-c-sticky--title">
      {columns.map((col) => (
        <GridItem span={12 / columns.length} key={col}>
          {col}
        </GridItem>
      ))}
    </Grid>
    <Grid className="rbac-c-sticky--data">
      {rows.map((row) =>
        row.cells.map((cell) => (
          <GridItem span={12 / columns.length} key={cell}>
            {cell}
          </GridItem>
        ))
      )}
    </Grid>
  </div>
);

const ReviewStep = () => {
  const formOptions = useFormApi();
  const {
    'role-name': name,
    'role-description': description,
    'role-copy-name': copyName,
    'role-copy-description': copyDescription,
    'add-permissions-table': permissions,
    'resource-definitions': resourceDefinitions,
    'has-cost-resources': hasCostResources,
    'role-type': type,
  } = formOptions.getState().values;
  const columns = ['Application', 'Resource type', 'Operation'];
  const rows = permissions.map((permission) => ({
    cells: permission.uuid.split(':'),
  }));

  const resourceDefinitionsRows = (resourceDefinitions || []).map(({ permission, resources }) => ({
    cells: [permission, resources.join(', ')],
  }));

  return (
    <React.Fragment>
      <Stack>
        <StackItem className="rbac-l-stack__item-summary">
          <Grid>
            <GridItem sm={12} md={2}>
              <Text component={TextVariants.h4} className="rbac-bold-text">
                Name
              </Text>
            </GridItem>
            <GridItem sm={12} md={10}>
              <Text component={TextVariants.p}>{type === 'create' ? name : copyName}</Text>
            </GridItem>
          </Grid>
          <Grid>
            <GridItem sm={12} md={2}>
              <Text component={TextVariants.h4} className="rbac-bold-text">
                Description
              </Text>
            </GridItem>
            <GridItem sm={12} md={10}>
              <Text component={TextVariants.p}>{type === 'create' ? description : copyDescription}</Text>
            </GridItem>
          </Grid>
          <Grid>
            <GridItem sm={12} md={2}>
              <Text component={TextVariants.h4} className="rbac-bold-text">
                Permissions
              </Text>
            </GridItem>
            <GridItem sm={12} md={10}>
              {stickyTable(columns, rows)}
            </GridItem>
          </Grid>
          {hasCostResources && (
            <Grid>
              <GridItem sm={12} md={2}>
                <Text component={TextVariants.h4} className="rbac-bold-text">
                  Resource definitions
                </Text>
              </GridItem>
              <GridItem sm={12} md={10}>
                {stickyTable(['Permission', 'Resource definitions'], resourceDefinitionsRows)}
              </GridItem>
            </Grid>
          )}
        </StackItem>
      </Stack>
    </React.Fragment>
  );
};

export default ReviewStep;
