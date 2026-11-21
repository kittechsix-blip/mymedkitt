// myMedKitt — drug-card consult engine: per-consult configuration and the virtual-id scheme. Pure, no data.
// Oncology (src/data/onc-drugs) and transplant (src/data/transplant-drugs) run on one engine; each supplies a DrugConsultConfig.
export function virtualIds(cfg) {
    return {
        virtualNodeId: (kind, slug) => `${cfg.prefix}${kind}-${slug}`,
        isVirtualNodeId: (nodeId) => cfg.kinds.some((k) => nodeId.startsWith(`${cfg.prefix}${k}-`)),
        parseVirtualNodeId: (nodeId) => {
            for (const k of cfg.kinds) {
                const p = `${cfg.prefix}${k}-`;
                if (nodeId.startsWith(p) && nodeId.length > p.length)
                    return { kind: k, slug: nodeId.slice(p.length) };
            }
            return null;
        },
    };
}
