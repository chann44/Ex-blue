import { Response, Router } from "express";
import { Counter, Registry, Summary, collectDefaultMetrics } from "prom-client";

export class Metrics {
  private router: Router;
  public registry: Registry;

  public requestCount: Counter;
  public requestsDuration: Summary;

  constructor(registry: Registry, router: Router) {
    this.registry = registry;
    this.router = router;

    collectDefaultMetrics({
      register: this.registry,
    });
    this.requestCount = new Counter({
      name: "http_request",
      help: "Total Number of http request",
      labelNames: ["route", "code", "method"] as const,
    });
    this.requestsDuration = new Summary({
      name: "http_request_duration",
      help: "Duration of request in seconds",
      labelNames: ["route", "code", "method"] as const,
    });

    this.registerMetrics();
    this.router.get("/metrics", this.sendMetrics.bind(this));
  }

  private registerMetrics() {
    this.registry.registerMetric(this.requestCount);
    this.registry.registerMetric(this.requestsDuration);
  }

  public async sendMetrics(_req: Request, res: Response) {
    res.setHeader("Content-Type", this.registry.contentType);
    const metrics = await this.registry.metrics();
    res.send(metrics);
  }
}
