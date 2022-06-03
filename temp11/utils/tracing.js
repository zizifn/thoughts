/* tracing.js */

import { ConsoleMetricExporter, MeterProvider } from '@opentelemetry/sdk-metrics-base';
// Require dependencies
import { NodeSDK, tracing } from "@opentelemetry/sdk-node";
// import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';

import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-base';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";

import  { OTLPTraceExporter }  from '@opentelemetry/exporter-trace-otlp-http';

let traceExporter = new ConsoleSpanExporter();
if (process.env.NODE_ENV === 'production') {
    const collectorOptions = {
        // url is optional and can be omitted - default is grpc://localhost:4317
        url: 'http://otel-agent-svc:4318/v1/traces',
    };
    traceExporter = new OTLPTraceExporter(collectorOptions);
}

const collectorMetricOptions = {
    // url is optional and can be omitted - default is grpc://localhost:4317
    url: 'grpc://localhost:4317',
};

const sdk = new NodeSDK({
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: 'my-node-service',
    }),
    traceExporter,

    // metricExporter: new OTLPMetricExporter(collectorMetricOptions),
    instrumentations: [getNodeAutoInstrumentations(
        {
            "@opentelemetry/instrumentation-http": {
                applyCustomAttributesOnSpan: (span, request, resp) => {
                    if (span.attributes['http.target']) {
                        span.updateName(span.attributes['http.target'])
                    }
                    span.setAttribute("james-test", resp.statusCode)
                }
            },
            "@opentelemetry/instrumentation-express": {
                ignoreLayers: [(name) => {
                    console.log('ddddddddddddddd' + name);
                    return name === 'bodyParser';
                }
                ]
            }
        }
    )]
});

const meterProvider = new MeterProvider({
    exporter: new ConsoleMetricExporter(),
    interval: 1000,
})

console.log('ddddddddddddddddddd');
await sdk.start();
console.log('started---');

export {
    meterProvider
}
