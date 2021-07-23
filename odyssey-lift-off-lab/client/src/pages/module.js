import { React } from "react";
import { Layout, ModuleDetail, QueryResult } from "../components";
import { gql, useQuery } from "@apollo/client";

export const GET_MODULE = gql`
  query getModuleAndParentTrack($moduleId: ID!, $trackId: ID!) {
    module(id: $moduleId) {
      id
      title
      content
      videoUrl
    }
    track(id: $trackId) {
      id
      title
      modules {
        id
        title
        length
      }
    }
  }
`;

const Module = ({ trackId, moduleId }) => {
  const { error, loading, data } = useQuery(GET_MODULE, {
    variables: {
      moduleId,
      trackId,
    },
  });

  return (
    <Layout fullwidth>
      <QueryResult data={data} error={error} loading={loading}>
        <ModuleDetail module={data?.module} track={data?.track} />
      </QueryResult>
    </Layout>
  );
};

export default Module;
