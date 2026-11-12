// Sample BPMN choreography XML, only used when VITE_USE_MOCK=true.
export const MOCK_XML = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn2:definitions xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn2:choreography id="Choreography_1">
    <bpmn2:participant id="P_Customer" name="Customer" />
    <bpmn2:participant id="P_Company" name="Company" />
    <bpmn2:startEvent id="Start_1">
      <bpmn2:outgoing>Flow_1</bpmn2:outgoing>
    </bpmn2:startEvent>
    <bpmn2:choreographyTask id="Task_1" name="Pay late fee" initiatingParticipantRef="P_Customer">
      <bpmn2:incoming>Flow_1</bpmn2:incoming>
      <bpmn2:outgoing>Flow_2</bpmn2:outgoing>
      <bpmn2:participantRef>P_Customer</bpmn2:participantRef>
      <bpmn2:participantRef>P_Company</bpmn2:participantRef>
    </bpmn2:choreographyTask>
    <bpmn2:choreographyTask id="Task_2" name="Send receipt" initiatingParticipantRef="P_Company">
      <bpmn2:incoming>Flow_2</bpmn2:incoming>
      <bpmn2:outgoing>Flow_3</bpmn2:outgoing>
      <bpmn2:participantRef>P_Company</bpmn2:participantRef>
      <bpmn2:participantRef>P_Customer</bpmn2:participantRef>
    </bpmn2:choreographyTask>
    <bpmn2:endEvent id="End_1">
      <bpmn2:incoming>Flow_3</bpmn2:incoming>
    </bpmn2:endEvent>
    <bpmn2:sequenceFlow id="Flow_1" sourceRef="Start_1" targetRef="Task_1" />
    <bpmn2:sequenceFlow id="Flow_2" sourceRef="Task_1" targetRef="Task_2" />
    <bpmn2:sequenceFlow id="Flow_3" sourceRef="Task_2" targetRef="End_1" />
  </bpmn2:choreography>
  <bpmndi:BPMNDiagram id="Diagram_1">
    <bpmndi:BPMNPlane id="Plane_1" bpmnElement="Choreography_1">
      <bpmndi:BPMNShape id="Start_1_di" bpmnElement="Start_1">
        <dc:Bounds x="150" y="182" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_1_di" bpmnElement="Task_1">
        <dc:Bounds x="240" y="160" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_1_P_Customer_di" bpmnElement="P_Customer" isMessageVisible="false" participantBandKind="top_initiating" choreographyActivityShape="Task_1_di">
        <dc:Bounds x="240" y="160" width="100" height="20" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_1_P_Company_di" bpmnElement="P_Company" isMessageVisible="false" participantBandKind="bottom_non_initiating" choreographyActivityShape="Task_1_di">
        <dc:Bounds x="240" y="220" width="100" height="20" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_2_di" bpmnElement="Task_2">
        <dc:Bounds x="400" y="160" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_2_P_Company_di" bpmnElement="P_Company" isMessageVisible="false" participantBandKind="top_initiating" choreographyActivityShape="Task_2_di">
        <dc:Bounds x="400" y="160" width="100" height="20" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_2_P_Customer_di" bpmnElement="P_Customer" isMessageVisible="false" participantBandKind="bottom_non_initiating" choreographyActivityShape="Task_2_di">
        <dc:Bounds x="400" y="220" width="100" height="20" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="End_1_di" bpmnElement="End_1">
        <dc:Bounds x="560" y="182" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_1_di" bpmnElement="Flow_1">
        <di:waypoint x="186" y="200" />
        <di:waypoint x="240" y="200" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_2_di" bpmnElement="Flow_2">
        <di:waypoint x="340" y="200" />
        <di:waypoint x="400" y="200" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_3_di" bpmnElement="Flow_3">
        <di:waypoint x="500" y="200" />
        <di:waypoint x="560" y="200" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn2:definitions>
`;
