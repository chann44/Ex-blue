import { Request, Response, Router } from "express";
import { Metrics } from "@/pkg/metrics";

export class MetricsHandler {
  private router: Router;
  private metrics: Metrics;
  constructor(router: Router, metrics: Metrics) {
    this.router = router;
    this.metrics = metrics;
    this.router.get("/metrics", this.sendMetrics.bind(this));
  }

  public async sendMetrics(_req: Request, res: Response) {
    res.setHeader("Content-Type", this.metrics.registry.contentType);
    const metrics = await this.metrics.registry.metrics();
    res.send(metrics);
  }
}
