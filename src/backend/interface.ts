import { z } from "zod";

// ========== Widget Variants ==========

const NodeWidgetSchema = z.object({
    card: z.boolean(),
});

export type NodeWidgetData = z.infer<typeof NodeWidgetSchema>;
export const NodeWidgetTypeName = "node";

const TextWidgetSchema = z.object({
    text: z.string(),
    card: z.boolean(),
});

export type TextWidgetData = z.infer<typeof TextWidgetSchema>;
export const TextWidgetTypeName = "text";

const ProgressWidgetSchema = z.object({
    text: z.string().nullable().optional(),
    progress: z.number(),
    card: z.boolean(),
});

export type ProgressWidgetData = z.infer<typeof ProgressWidgetSchema>;
export const ProgressWidgetTypeName = "progress";

const ButtonWidgetSchema = z.object({
    text: z.string(),
    card: z.boolean(),
});

export type ButtonWidgetData = z.infer<typeof ButtonWidgetSchema>;
export const ButtonWidgetTypeName = "button";

const WidgetSchema = z.discriminatedUnion("type", [
    z.object({ type: z.literal(NodeWidgetTypeName), data: NodeWidgetSchema }),
    z.object({ type: z.literal(TextWidgetTypeName), data: TextWidgetSchema }),
    z.object({ type: z.literal(ProgressWidgetTypeName), data: ProgressWidgetSchema }),
    z.object({ type: z.literal(ButtonWidgetTypeName), data: ButtonWidgetSchema }),
]);

export type Widget = z.infer<typeof WidgetSchema>;

// ========== WidgetPacket, DeletePacket, HandledPacket ==========

const DeletePacketSchema = z.object({
    path: z.array(z.string()),
});

export type DeletePacket = z.infer<typeof DeletePacketSchema>;

const HandledPacketSchema = z.object({
    path: z.array(z.string()),
});

export type HandledPacket = z.infer<typeof HandledPacketSchema>;

const WidgetPacketSchema = z.object({
    path: z.array(z.string()),
    widget: WidgetSchema,
});


export type WidgetPacket = z.infer<typeof WidgetPacketSchema>;

// ========== SendTypes Enum ==========

export const SendTypesSchema = z.discriminatedUnion("type", [
    z.object({ type: z.literal("widget"), data: WidgetPacketSchema }),
    z.object({ type: z.literal("delete"), data: DeletePacketSchema }),
    z.object({ type: z.literal("clear") }),
    z.object({ type: z.literal("handled"), data: HandledPacketSchema }),
]);

export type SendTypes = z.infer<typeof SendTypesSchema>;

// ========== EventTypes Enum ==========

const ClickSchema = z.object({}); // Empty object

const EventTypesSchema = z.discriminatedUnion("type", [
    z.object({ type: z.literal("click"), data: ClickSchema }),
]);

export type EventTypes = z.infer<typeof EventTypesSchema>;

// ========== Event ==========

const EventSchema = z.object({
    path: z.array(z.string()),
    data: EventTypesSchema,
});

export type Event = z.infer<typeof EventSchema>;
