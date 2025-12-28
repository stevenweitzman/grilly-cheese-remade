export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      catering_order_rate_limit: {
        Row: {
          created_at: string
          id: string
        }
        Insert: {
          created_at?: string
          id?: string
        }
        Update: {
          created_at?: string
          id?: string
        }
        Relationships: []
      }
      catering_orders: {
        Row: {
          addons_total: number | null
          address: string
          admin_notes: string | null
          amount_charged: number | null
          base_subtotal: number | null
          bulk_discount_amount: number | null
          bulk_discount_percent: number | null
          cart_items: Json | null
          city: string
          client_id: string | null
          contact_email: string
          contact_name: string
          contact_phone: string
          created_at: string
          delivery_fee: number | null
          delivery_miles_over_free: number | null
          deposit_percentage: number | null
          dessert_price_per_person: number | null
          entree_subtotal: number | null
          event_date: string
          event_name: string
          event_time: string
          extras_subtotal: number | null
          food_subtotal: number | null
          gluten_free_count: number | null
          gratuity: number | null
          guest_count: number | null
          id: string
          include_desserts: boolean | null
          minimum_charge_applied: boolean | null
          package_type:
            | Database["public"]["Enums"]["catering_package_type"]
            | null
          paid_at: string | null
          payment_status: string | null
          payment_type: string | null
          paypal_transaction_id: string | null
          price_per_person: number | null
          selected_hotdogs: Json | null
          selected_sandwiches: Json
          special_notes: string | null
          state: string
          status: Database["public"]["Enums"]["catering_order_status"]
          total_amount: number | null
          travel_distance_miles: number | null
          travel_fee: number | null
          updated_at: string
          vegan_count: number | null
          zip: string
        }
        Insert: {
          addons_total?: number | null
          address: string
          admin_notes?: string | null
          amount_charged?: number | null
          base_subtotal?: number | null
          bulk_discount_amount?: number | null
          bulk_discount_percent?: number | null
          cart_items?: Json | null
          city: string
          client_id?: string | null
          contact_email: string
          contact_name: string
          contact_phone: string
          created_at?: string
          delivery_fee?: number | null
          delivery_miles_over_free?: number | null
          deposit_percentage?: number | null
          dessert_price_per_person?: number | null
          entree_subtotal?: number | null
          event_date: string
          event_name: string
          event_time: string
          extras_subtotal?: number | null
          food_subtotal?: number | null
          gluten_free_count?: number | null
          gratuity?: number | null
          guest_count?: number | null
          id?: string
          include_desserts?: boolean | null
          minimum_charge_applied?: boolean | null
          package_type?:
            | Database["public"]["Enums"]["catering_package_type"]
            | null
          paid_at?: string | null
          payment_status?: string | null
          payment_type?: string | null
          paypal_transaction_id?: string | null
          price_per_person?: number | null
          selected_hotdogs?: Json | null
          selected_sandwiches?: Json
          special_notes?: string | null
          state: string
          status?: Database["public"]["Enums"]["catering_order_status"]
          total_amount?: number | null
          travel_distance_miles?: number | null
          travel_fee?: number | null
          updated_at?: string
          vegan_count?: number | null
          zip: string
        }
        Update: {
          addons_total?: number | null
          address?: string
          admin_notes?: string | null
          amount_charged?: number | null
          base_subtotal?: number | null
          bulk_discount_amount?: number | null
          bulk_discount_percent?: number | null
          cart_items?: Json | null
          city?: string
          client_id?: string | null
          contact_email?: string
          contact_name?: string
          contact_phone?: string
          created_at?: string
          delivery_fee?: number | null
          delivery_miles_over_free?: number | null
          deposit_percentage?: number | null
          dessert_price_per_person?: number | null
          entree_subtotal?: number | null
          event_date?: string
          event_name?: string
          event_time?: string
          extras_subtotal?: number | null
          food_subtotal?: number | null
          gluten_free_count?: number | null
          gratuity?: number | null
          guest_count?: number | null
          id?: string
          include_desserts?: boolean | null
          minimum_charge_applied?: boolean | null
          package_type?:
            | Database["public"]["Enums"]["catering_package_type"]
            | null
          paid_at?: string | null
          payment_status?: string | null
          payment_type?: string | null
          paypal_transaction_id?: string | null
          price_per_person?: number | null
          selected_hotdogs?: Json | null
          selected_sandwiches?: Json
          special_notes?: string | null
          state?: string
          status?: Database["public"]["Enums"]["catering_order_status"]
          total_amount?: number | null
          travel_distance_miles?: number | null
          travel_fee?: number | null
          updated_at?: string
          vegan_count?: number | null
          zip?: string
        }
        Relationships: [
          {
            foreignKeyName: "catering_orders_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          role: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          role: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      communications: {
        Row: {
          created_at: string
          id: string
          message: string
          quote_request_id: string
          read_at: string | null
          recipient_id: string | null
          sender_id: string
          subject: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          quote_request_id: string
          read_at?: string | null
          recipient_id?: string | null
          sender_id: string
          subject: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          quote_request_id?: string
          read_at?: string | null
          recipient_id?: string | null
          sender_id?: string
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "communications_quote_request_id_fkey"
            columns: ["quote_request_id"]
            isOneToOne: false
            referencedRelation: "quote_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "communications_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "communications_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      conversation_rate_limit: {
        Row: {
          created_at: string
          id: string
        }
        Insert: {
          created_at?: string
          id?: string
        }
        Update: {
          created_at?: string
          id?: string
        }
        Relationships: []
      }
      conversations: {
        Row: {
          ended_at: string | null
          id: string
          message_count: number
          started_at: string
          transcript_sent: boolean | null
          visitor_email: string | null
          visitor_name: string | null
          visitor_phone: string | null
        }
        Insert: {
          ended_at?: string | null
          id?: string
          message_count?: number
          started_at?: string
          transcript_sent?: boolean | null
          visitor_email?: string | null
          visitor_name?: string | null
          visitor_phone?: string | null
        }
        Update: {
          ended_at?: string | null
          id?: string
          message_count?: number
          started_at?: string
          transcript_sent?: boolean | null
          visitor_email?: string | null
          visitor_name?: string | null
          visitor_phone?: string | null
        }
        Relationships: []
      }
      documents: {
        Row: {
          created_at: string
          description: string | null
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id: string
          quote_request_id: string
          uploaded_by: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id?: string
          quote_request_id: string
          uploaded_by: string
        }
        Update: {
          created_at?: string
          description?: string | null
          file_name?: string
          file_path?: string
          file_size?: number
          file_type?: string
          id?: string
          quote_request_id?: string
          uploaded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_quote_request_id_fkey"
            columns: ["quote_request_id"]
            isOneToOne: false
            referencedRelation: "quote_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      guest_quote_submissions: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
          phone: string | null
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          id?: string
          phone?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          phone?: string | null
        }
        Relationships: []
      }
      invoices: {
        Row: {
          amount: number
          amount_paid: number
          created_at: string
          due_date: string | null
          id: string
          invoice_number: string
          notes: string | null
          paid_at: string | null
          quote_request_id: string
          status: Database["public"]["Enums"]["invoice_status"]
          updated_at: string
        }
        Insert: {
          amount: number
          amount_paid?: number
          created_at?: string
          due_date?: string | null
          id?: string
          invoice_number: string
          notes?: string | null
          paid_at?: string | null
          quote_request_id: string
          status?: Database["public"]["Enums"]["invoice_status"]
          updated_at?: string
        }
        Update: {
          amount?: number
          amount_paid?: number
          created_at?: string
          due_date?: string | null
          id?: string
          invoice_number?: string
          notes?: string | null
          paid_at?: string | null
          quote_request_id?: string
          status?: Database["public"]["Enums"]["invoice_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_quote_request_id_fkey"
            columns: ["quote_request_id"]
            isOneToOne: false
            referencedRelation: "quote_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_subscribers: {
        Row: {
          email: string
          id: string
          source: string | null
          subscribed_at: string
        }
        Insert: {
          email: string
          id?: string
          source?: string | null
          subscribed_at?: string
        }
        Update: {
          email?: string
          id?: string
          source?: string | null
          subscribed_at?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          id: string
          invoice_id: string
          notes: string | null
          payment_date: string
          payment_method: string | null
          transaction_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          invoice_id: string
          notes?: string | null
          payment_date: string
          payment_method?: string | null
          transaction_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          invoice_id?: string
          notes?: string | null
          payment_date?: string
          payment_method?: string | null
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          company_name: string | null
          created_at: string
          full_name: string
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          company_name?: string | null
          created_at?: string
          full_name: string
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          company_name?: string | null
          created_at?: string
          full_name?: string
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      quote_requests: {
        Row: {
          address: string | null
          admin_notes: string | null
          city: string | null
          client_id: string | null
          created_at: string
          dietary_restrictions: string | null
          event_date: string
          event_time: string | null
          event_type: string
          final_amount: number | null
          guest_submission_id: string | null
          guests: number
          id: string
          notes: string | null
          property_type: string | null
          quoted_amount: number | null
          state: string | null
          status: Database["public"]["Enums"]["quote_status"]
          updated_at: string
          zip: string | null
        }
        Insert: {
          address?: string | null
          admin_notes?: string | null
          city?: string | null
          client_id?: string | null
          created_at?: string
          dietary_restrictions?: string | null
          event_date: string
          event_time?: string | null
          event_type: string
          final_amount?: number | null
          guest_submission_id?: string | null
          guests: number
          id?: string
          notes?: string | null
          property_type?: string | null
          quoted_amount?: number | null
          state?: string | null
          status?: Database["public"]["Enums"]["quote_status"]
          updated_at?: string
          zip?: string | null
        }
        Update: {
          address?: string | null
          admin_notes?: string | null
          city?: string | null
          client_id?: string | null
          created_at?: string
          dietary_restrictions?: string | null
          event_date?: string
          event_time?: string | null
          event_type?: string
          final_amount?: number | null
          guest_submission_id?: string | null
          guests?: number
          id?: string
          notes?: string | null
          property_type?: string | null
          quoted_amount?: number | null
          state?: string | null
          status?: Database["public"]["Enums"]["quote_status"]
          updated_at?: string
          zip?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quote_requests_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quote_requests_guest_submission_id_fkey"
            columns: ["guest_submission_id"]
            isOneToOne: false
            referencedRelation: "guest_quote_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_guest_quote_submission: {
        Args: { p_email: string; p_full_name: string; p_phone?: string }
        Returns: string
      }
      get_conversation_message_count: {
        Args: { conv_id: string }
        Returns: number
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "client"
      catering_order_status:
        | "pending_payment"
        | "pending_review"
        | "confirmed"
        | "in_prep"
        | "ready_for_delivery"
        | "delivered"
        | "completed"
        | "cancelled"
        | "refunded"
      catering_package_type: "simple" | "full"
      invoice_status: "draft" | "sent" | "paid" | "overdue"
      quote_status:
        | "pending"
        | "quoted"
        | "approved"
        | "completed"
        | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "client"],
      catering_order_status: [
        "pending_payment",
        "pending_review",
        "confirmed",
        "in_prep",
        "ready_for_delivery",
        "delivered",
        "completed",
        "cancelled",
        "refunded",
      ],
      catering_package_type: ["simple", "full"],
      invoice_status: ["draft", "sent", "paid", "overdue"],
      quote_status: ["pending", "quoted", "approved", "completed", "cancelled"],
    },
  },
} as const
