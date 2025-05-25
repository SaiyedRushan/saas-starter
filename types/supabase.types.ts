export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      crossword_clues: {
        Row: {
          answer: string
          clue_number: number
          clue_text: string
          difficulty_level: string | null
          direction: string
          grid_id: number
          id: number
          length: number
          start_col: number
          start_row: number
        }
        Insert: {
          answer: string
          clue_number: number
          clue_text: string
          difficulty_level?: string | null
          direction: string
          grid_id: number
          id?: never
          length: number
          start_col: number
          start_row: number
        }
        Update: {
          answer?: string
          clue_number?: number
          clue_text?: string
          difficulty_level?: string | null
          direction?: string
          grid_id?: number
          id?: never
          length?: number
          start_col?: number
          start_row?: number
        }
        Relationships: [
          {
            foreignKeyName: "crossword_clues_grid_id_fkey"
            columns: ["grid_id"]
            isOneToOne: false
            referencedRelation: "crossword_grids"
            referencedColumns: ["id"]
          },
        ]
      }
      crossword_grids: {
        Row: {
          created_at: string | null
          game_id: number
          grid_data: Json
          grid_size: number
          id: number
        }
        Insert: {
          created_at?: string | null
          game_id: number
          grid_data: Json
          grid_size?: number
          id?: never
        }
        Update: {
          created_at?: string | null
          game_id?: number
          grid_data?: Json
          grid_size?: number
          id?: never
        }
        Relationships: [
          {
            foreignKeyName: "crossword_grids_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          id: string
          stripe_customer_id: string | null
        }
        Insert: {
          id: string
          stripe_customer_id?: string | null
        }
        Update: {
          id?: string
          stripe_customer_id?: string | null
        }
        Relationships: []
      }
      feature_requests: {
        Row: {
          author_email: string
          author_id: string | null
          created_at: string | null
          description: string
          id: string
          title: string
          type: string
          vote_count: number | null
        }
        Insert: {
          author_email: string
          author_id?: string | null
          created_at?: string | null
          description: string
          id?: string
          title: string
          type: string
          vote_count?: number | null
        }
        Update: {
          author_email?: string
          author_id?: string | null
          created_at?: string | null
          description?: string
          id?: string
          title?: string
          type?: string
          vote_count?: number | null
        }
        Relationships: []
      }
      fill_blank_answers: {
        Row: {
          alternative_answers: string[] | null
          blank_position: number
          correct_answer: string
          display_order: number | null
          id: number
          question_id: number
        }
        Insert: {
          alternative_answers?: string[] | null
          blank_position: number
          correct_answer: string
          display_order?: number | null
          id?: never
          question_id: number
        }
        Update: {
          alternative_answers?: string[] | null
          blank_position?: number
          correct_answer?: string
          display_order?: number | null
          id?: never
          question_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "fill_blank_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "fill_blank_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      fill_blank_questions: {
        Row: {
          answer_text: string
          created_at: string | null
          display_order: number | null
          game_id: number
          hints: string | null
          id: number
          is_case_sensitive: boolean | null
          points: number | null
          question_text: string
        }
        Insert: {
          answer_text: string
          created_at?: string | null
          display_order?: number | null
          game_id: number
          hints?: string | null
          id?: never
          is_case_sensitive?: boolean | null
          points?: number | null
          question_text: string
        }
        Update: {
          answer_text?: string
          created_at?: string | null
          display_order?: number | null
          game_id?: number
          hints?: string | null
          id?: never
          is_case_sensitive?: boolean | null
          points?: number | null
          question_text?: string
        }
        Relationships: [
          {
            foreignKeyName: "fill_blank_questions_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
        ]
      }
      flashcards: {
        Row: {
          back_image_url: string | null
          back_text: string
          created_at: string | null
          difficulty_level: string | null
          display_order: number | null
          front_image_url: string | null
          front_text: string
          game_id: number
          id: number
          tags: string[] | null
        }
        Insert: {
          back_image_url?: string | null
          back_text: string
          created_at?: string | null
          difficulty_level?: string | null
          display_order?: number | null
          front_image_url?: string | null
          front_text: string
          game_id: number
          id?: never
          tags?: string[] | null
        }
        Update: {
          back_image_url?: string | null
          back_text?: string
          created_at?: string | null
          difficulty_level?: string | null
          display_order?: number | null
          front_image_url?: string | null
          front_text?: string
          game_id?: number
          id?: never
          tags?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "flashcards_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
        ]
      }
      game_session_answers: {
        Row: {
          answered_at: string | null
          id: number
          is_correct: boolean | null
          points_earned: number | null
          question_id: number
          question_type: string
          session_id: number
          time_taken: number | null
          user_answer: string | null
        }
        Insert: {
          answered_at?: string | null
          id?: never
          is_correct?: boolean | null
          points_earned?: number | null
          question_id: number
          question_type: string
          session_id: number
          time_taken?: number | null
          user_answer?: string | null
        }
        Update: {
          answered_at?: string | null
          id?: never
          is_correct?: boolean | null
          points_earned?: number | null
          question_id?: number
          question_type?: string
          session_id?: number
          time_taken?: number | null
          user_answer?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "game_session_answers_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "game_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      game_sessions: {
        Row: {
          completed_at: string | null
          game_id: number
          id: number
          is_completed: boolean | null
          max_score: number | null
          score: number | null
          session_data: Json | null
          session_token: string | null
          started_at: string | null
          time_taken: number | null
          user_id: number | null
        }
        Insert: {
          completed_at?: string | null
          game_id: number
          id?: never
          is_completed?: boolean | null
          max_score?: number | null
          score?: number | null
          session_data?: Json | null
          session_token?: string | null
          started_at?: string | null
          time_taken?: number | null
          user_id?: number | null
        }
        Update: {
          completed_at?: string | null
          game_id?: number
          id?: never
          is_completed?: boolean | null
          max_score?: number | null
          score?: number | null
          session_data?: Json | null
          session_token?: string | null
          started_at?: string | null
          time_taken?: number | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "game_sessions_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
        ]
      }
      game_types: {
        Row: {
          code: string
          description: string | null
          id: number
          is_active: boolean | null
          name: string
        }
        Insert: {
          code: string
          description?: string | null
          id?: never
          is_active?: boolean | null
          name: string
        }
        Update: {
          code?: string
          description?: string | null
          id?: never
          is_active?: boolean | null
          name?: string
        }
        Relationships: []
      }
      games: {
        Row: {
          created_at: string | null
          description: string | null
          difficulty_level: string | null
          display_order: number | null
          game_type_id: number
          id: number
          instructions: string | null
          is_published: boolean | null
          max_attempts: number | null
          project_id: number
          time_limit: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          display_order?: number | null
          game_type_id: number
          id?: never
          instructions?: string | null
          is_published?: boolean | null
          max_attempts?: number | null
          project_id: number
          time_limit?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          display_order?: number | null
          game_type_id?: number
          id?: never
          instructions?: string | null
          is_published?: boolean | null
          max_attempts?: number | null
          project_id?: number
          time_limit?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "games_game_type_id_fkey"
            columns: ["game_type_id"]
            isOneToOne: false
            referencedRelation: "game_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "games_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      mcq_options: {
        Row: {
          display_order: number | null
          id: number
          is_correct: boolean | null
          option_text: string
          question_id: number
        }
        Insert: {
          display_order?: number | null
          id?: never
          is_correct?: boolean | null
          option_text: string
          question_id: number
        }
        Update: {
          display_order?: number | null
          id?: never
          is_correct?: boolean | null
          option_text?: string
          question_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "mcq_options_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "mcq_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      mcq_questions: {
        Row: {
          created_at: string | null
          display_order: number | null
          explanation: string | null
          game_id: number
          id: number
          points: number | null
          question_text: string
        }
        Insert: {
          created_at?: string | null
          display_order?: number | null
          explanation?: string | null
          game_id: number
          id?: never
          points?: number | null
          question_text: string
        }
        Update: {
          created_at?: string | null
          display_order?: number | null
          explanation?: string | null
          game_id?: number
          id?: never
          points?: number | null
          question_text?: string
        }
        Relationships: [
          {
            foreignKeyName: "mcq_questions_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
        ]
      }
      prices: {
        Row: {
          active: boolean | null
          currency: string | null
          description: string | null
          id: string
          interval: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count: number | null
          metadata: Json | null
          product_id: string | null
          trial_period_days: number | null
          type: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount: number | null
        }
        Insert: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Update: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id?: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "prices_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          active: boolean | null
          description: string | null
          id: string
          image: string | null
          metadata: Json | null
          name: string | null
        }
        Insert: {
          active?: boolean | null
          description?: string | null
          id: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Update: {
          active?: boolean | null
          description?: string | null
          id?: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          is_active: boolean | null
          name: string
          tag: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: never
          is_active?: boolean | null
          name: string
          tag?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: never
          is_active?: boolean | null
          name?: string
          tag?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          cancel_at: string | null
          cancel_at_period_end: boolean | null
          canceled_at: string | null
          created: string
          current_period_end: string
          current_period_start: string
          ended_at: string | null
          id: string
          metadata: Json | null
          price_id: string | null
          quantity: number | null
          status: Database["public"]["Enums"]["subscription_status"] | null
          trial_end: string | null
          trial_start: string | null
          user_id: string
        }
        Insert: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
          user_id: string
        }
        Update: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id?: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_price_id_fkey"
            columns: ["price_id"]
            isOneToOne: false
            referencedRelation: "prices"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          billing_address: Json | null
          full_name: string | null
          id: string
          payment_method: Json | null
        }
        Insert: {
          avatar_url?: string | null
          billing_address?: Json | null
          full_name?: string | null
          id: string
          payment_method?: Json | null
        }
        Update: {
          avatar_url?: string | null
          billing_address?: Json | null
          full_name?: string | null
          id?: string
          payment_method?: Json | null
        }
        Relationships: []
      }
      votes: {
        Row: {
          created_at: string | null
          feature_request_id: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          feature_request_id?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          feature_request_id?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "votes_feature_request_id_fkey"
            columns: ["feature_request_id"]
            isOneToOne: false
            referencedRelation: "feature_requests"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      decrement_vote_count: {
        Args: { request_id: string }
        Returns: undefined
      }
      increment_vote_count: {
        Args: { request_id: string }
        Returns: undefined
      }
    }
    Enums: {
      pricing_plan_interval: "day" | "week" | "month" | "year"
      pricing_type: "one_time" | "recurring"
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      pricing_plan_interval: ["day", "week", "month", "year"],
      pricing_type: ["one_time", "recurring"],
      subscription_status: [
        "trialing",
        "active",
        "canceled",
        "incomplete",
        "incomplete_expired",
        "past_due",
        "unpaid",
      ],
    },
  },
} as const
